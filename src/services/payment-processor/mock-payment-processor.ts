import { v4 as uuidv4 } from "uuid";
import {ErrorResponse, PaymentProcessor, PaymentResponse} from "../../interfaces/payment-processor.interface";
import moment from "moment/moment";
import {BillingProcessorTypes} from "../../const/billing-processor-types";

export class MockPaymentProcessor implements PaymentProcessor {
    async processPayment(amount: number, customerId: string): Promise<PaymentResponse | ErrorResponse> {
        console.log(`Payment processing of Amount: ${amount} for Customer: ${customerId}`);

        if (isNaN(amount) || amount <= 0) {
            return { success: false, message: "Invalid payment amount. Amount must be greater than zero." };
        }

        // This for the failed try - a random chance of failure
        const successful = Math.random() > 0.2; // 80% chance of success
        if (!successful) {
            return { success: false, message: "Payment processing failed due to some reason. Please try again later." };
        }
        return {
            success: true,
            data: {
                id: uuidv4(),
                payment_date: moment().toISOString(),
                payment_method: BillingProcessorTypes.MOCK
            },
        };
    }
}