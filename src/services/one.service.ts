import { OpenAPIRoute } from "chanfana";
import {OneSchemaValidator} from "../swagger/one.schema.validator";

export class OnePaymentService extends OpenAPIRoute {
	schema = OneSchemaValidator;

	async handle(context) {
		const id = context.req.param('id');
		console.log('id: ', id);

		const existing = await context.env.PAYMENT_KV.get(id);
		console.log('existing: ', existing);

		if (!existing) {
			return context.json({ success: false, error: 'Invalid Payment ID' }, 404);
		}
		return context.json({
			success: true,
			result: {
				data: JSON.parse(existing)
			}
		}, 201);
	}
}
