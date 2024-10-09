import {DateTime} from "luxon";
import { OpenAPIRoute } from "chanfana";
import {UpdateSchemaValidator} from "../swagger/update.schema.validator";
import {Payment, PaymentSchema} from "../entities/payment.entity";

export class UpdatePaymentService extends OpenAPIRoute {
	schema = UpdateSchemaValidator;

	async handle(context) {
		const id = context.req.param('id');
		const result = PaymentSchema.safeParse(await context.req.json());
		if (!result.success) {
			return context.json({ success: false, error: 'Invalid payment plan data' }, 400);
		}

		const existing = await context.env.PAYMENT_KV.get(id);
		if (!existing) {
			return context.json({ success: false, error: 'Invalid payment' }, 404);
		}

		const update: Partial<Payment> = {
			...JSON.parse(existing),
			...result.data,
			updatedAt: DateTime.now().toISO(),
		};
		await context.env.PAYMENT_KV.put(id, JSON.stringify(update));
		return context.json({
			success: true,
			result: {
				data: JSON.parse(await context.env.PAYMENT_KV.get(id))
			}
		}, 201);
	}
}
