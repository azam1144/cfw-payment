import {OpenAPIRoute} from "chanfana";
import {PaymentMethod} from "../const/payment-method";
import {BillingProcessorTypes} from "../const/billing-processor-types";
import {StaticTypesSchemaValidator} from "../swagger/static-types.schema.validator";

export class StaticTypesService extends OpenAPIRoute {
	schema = StaticTypesSchemaValidator;
	async handle(context: any): Promise<any> {
		return {
			paymentMethod: Object.values(PaymentMethod),
			billingProcessorTypes: Object.values(BillingProcessorTypes),
		}
	}
}
