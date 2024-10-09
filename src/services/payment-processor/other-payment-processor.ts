import {ErrorResponse, PaymentProcessor, PaymentResponse} from "../../interfaces/payment-processor.interface";

export class OtherPaymentProcessor implements PaymentProcessor{
    async processPayment(amount: number, customerId: string): Promise<PaymentResponse | ErrorResponse> {
        console.log(`Payment processing of Amount: ${amount} for Customer: ${customerId}`);

        return { success: false, message: 'Need to implement this processor!' };
    }
}