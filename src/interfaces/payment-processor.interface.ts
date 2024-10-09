export interface PaymentProcessor {
    processPayment(amount: number, customerId: string): Promise<PaymentResponse | ErrorResponse>
}

export interface PaymentResponse {
    success: boolean,
    data: {
        id: string;
        payment_date: string;
        payment_method: string;
    }
    message?: string,
    code?: number,
}


export interface ErrorResponse {
    success: boolean;
    message: string;
    code?: number;
}
