import {ErrorResponse, PaymentProcessor} from "../../interfaces/payment-processor.interface";
import {MockPaymentProcessor} from "./mock-payment-processor";
import {OtherPaymentProcessor} from "./other-payment-processor";

export class PaymentProcessorFactory {
    static createPaymentProcessor(processorType: 'mock' | 'other'): PaymentProcessor {
        switch (processorType) {
            case "mock":
                return new MockPaymentProcessor();
            case "other":
                // Future implementations for other payment processors can be here
                return new OtherPaymentProcessor();
            default:
                throw new Error('Invalid payment processor type');
        }
    }
}