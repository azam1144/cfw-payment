import { OpenAPIRoute } from "chanfana";
import {getPage, pagination} from "../core/utils";
import {listSchemaValidator} from "../swagger/list.schema.validator";
import {Payment} from "../entities/payment.entity";

export class ListAllPayments extends OpenAPIRoute {
	schema = listSchemaValidator;

	async handle(context) {
		const data = await this.getValidatedData<typeof this.schema>();
		let { page } = data.query;
		page = getPage(page);

		const keys = await context.env.PAYMENT_KV.list();
		const {totalPages, startIndex, endIndex} = pagination(page, keys.keys.length);

		const payments: Payment[] = [];
		for (const key of keys.keys.slice(startIndex, endIndex)) {
			const payment = await context.env.PAYMENT_KV.get(key.name);
			if (payment) {
				payments.push(JSON.parse(payment) as Payment);
			}
		}

		return context.json({
			success: true,
			result: {
				data: payments
			},
			pagination: {
				currentPage: page,
				totalPages: totalPages,
				totalCount: keys.keys.length,
			},
		}, 200);
	}
}
