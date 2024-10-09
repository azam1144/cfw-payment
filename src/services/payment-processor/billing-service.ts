import {ErrorResponse, PaymentProcessor, PaymentResponse} from "../../interfaces/payment-processor.interface";
import {PaymentProcessorFactory} from "./payment-processor-factory";

export class BillingService {
    private paymentProcessor: PaymentProcessor;

    constructor(processorType: 'mock' | 'other') {
        this.paymentProcessor = PaymentProcessorFactory.createPaymentProcessor(processorType);
    }

    async processPayment(amount: number, customerId: string): Promise<PaymentResponse | ErrorResponse> {
        const response = await this.paymentProcessor.processPayment(amount, customerId);
        if ('error' in response) {
            console.error("Error processing payment:", response.error);
        }
        return response;
    }
}