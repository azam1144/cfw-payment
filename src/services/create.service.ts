import { Context } from "hono";
import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { OpenAPIRoute } from "chanfana";
import { RpcService } from "./rpc.service";
import { Payment } from "../entities/payment.entity";
import { createSchemaValidator } from "../swagger/create.schema.validator";
import { BillingService } from "./payment-processor/billing-service";
import { BillingProcessorTypes } from "../const/billing-processor-types";
import { getDateOnly, serializeResponse } from "../core/utils";
import { CreateInvoiceType } from "../const/create-invoice.type";
import { SendNotificationType } from "../const/send-notification.type";

export class CreatePaymentService extends OpenAPIRoute {
	schema = createSchemaValidator;
	private rpcService;

	// Handle payment processing
	async handle(context: Context) {
		this.rpcService = new RpcService(context);

		const payload = await context.req.json();
		try {
			// Retrieve the invoice
			let invoice: any = await this.rpcService.getOneInvoice(payload.invoice_id);
			invoice = serializeResponse(invoice);

			const billingService = new BillingService(BillingProcessorTypes.MOCK);
			const billingResponse = await billingService.processPayment(payload.amount, invoice.customer_id);

			if (billingResponse.success) {
				// Create and store payment record
				const payment: Payment = {
					id: uuidv4(),
					createdAt: DateTime.now().toISO(),
					updatedAt: DateTime.now().toISO(),
					...payload,
				};
				await context.env.PAYMENT_KV.put(payment.id, JSON.stringify(payment));

				// Create invoice payload
				const createInvoicePayload: CreateInvoiceType = {
					customer_id: invoice.customer_id,
					invoice_id: invoice.id,
					payment_id: payment.id,
					content: 'Payment is processed successfully!',
				};
				const generateInvoiceResp = await this.rpcService.createInvoice(createInvoicePayload);

				// Send notification if customer ID is present
				if (invoice.customer_id) {
					const content = await this.prepareEmailContent(invoice.customer_id, invoice);
					const sendNotificationPayload: SendNotificationType = {
						customer_id: invoice.customer_id,
						invoice_id: invoice.id,
						payment_id: payment.id,
						content,
					};
					await this.rpcService.sendNotification(sendNotificationPayload);
				}

				// Return success response if invoice generation was successful
				if (generateInvoiceResp.success) {
					return context.json({
						success: true,
						result: {
							data: payment,
						},
					}, 201);
				}
				return context.json({
					success: false,
					message: generateInvoiceResp.message,
				}, generateInvoiceResp.code);
			} else {
				// Send notification for payment failure
				const content = `Payment failed due to some reason!`;
				const sendNotificationPayload: SendNotificationType = {
					customer_id: invoice.customer_id,
					invoice_id: invoice.id,
					content,
				};
				await this.rpcService.sendNotification(sendNotificationPayload);
			}
			return context.json({
				success: false,
				message: billingResponse.message || 'Payment failed due to some reason!',
			}, 402);
		} catch (err) {
			console.log('Error: ', err);
			return context.json({
				success: false,
				message: err.message,
			}, err.code || 402);
		}
	}

	// Prepare email content for the customer
	async prepareEmailContent(customer_id: string, invoice: any): Promise<string> {
		let customer: any = await this.rpcService.getOneCustomer(customer_id);
		customer = serializeResponse(customer);

		let subscription: any = await this.rpcService.getOneSubscription(customer.subscriptionPlanId);
		subscription = serializeResponse(subscription);
		return `<b>Invoice generated successfully!</b> \n\n ` +
			`Hello ${customer?.name ?? ''} \n` +
			`Your invoice has been generated with the following details: \n` +
			`Subscription: <b>${subscription?.name ?? ''}</b> \n` +
			`Total Amount: ${invoice?.amount ?? 0} \n` +
			`Period: ${getDateOnly(invoice.payment_date)} \n\n`;
	}
}