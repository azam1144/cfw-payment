import { OpenAPIRoute } from "chanfana";
import {DeleteSchemaValidator} from "../swagger/delete.schema.validator";

export class DeletePaymentService extends OpenAPIRoute {
	schema = DeleteSchemaValidator;

	async handle(context) {
		const id = context.req.param('id');
		const existing = await context.env.PAYMENT_KV.get(id);
		if (!existing) {
			return context.json({ success: false, error: 'Invalid Payment ID' }, 404);
		}

		await context.env.PAYMENT_KV.delete(id);

		return context.json({
			success: true,
			result: {
				data: JSON.parse(existing)
			}
		}, 200);
	}
}
