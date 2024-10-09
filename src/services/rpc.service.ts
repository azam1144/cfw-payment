import {api, ApiResponse} from "../core/utils";
import {CreateInvoiceType} from "../const/create-invoice.type";
import {SendNotificationType} from "../const/send-notification.type";

export class RpcService {
    private context;

    constructor(context: any) {
        this.context = context;
    }

    async sendNotification(sendNotificationPayload: SendNotificationType): Promise<ApiResponse> {
        return await api(`${this.context.env.NOTIFICATION_WORKER_URL}/notification/send`, 'POST', sendNotificationPayload);
    }

    async createInvoice(createInvoicePayload: CreateInvoiceType): Promise<ApiResponse> {
        return await api(`${this.context.env.INVOICE_WORKER_URL}/invoice/create`, 'POST', createInvoicePayload);
    }

    async getOneCustomer(id: string): Promise<ApiResponse> {
        return await api(`${this.context.env.SUBSCRIPTION_WORKER_URL}/customer/one/${id}`, 'GET');
    }

    async getOneSubscription(id: string): Promise<ApiResponse> {
        return await api(`${this.context.env.SUBSCRIPTION_WORKER_URL}/subscription/one/${id}`, 'GET');
    }

    async getOneInvoice(id: string): Promise<ApiResponse> {
        return await api(`${this.context.env.INVOICE_WORKER_URL}/invoice/one/${id}`, 'GET');
    }
}