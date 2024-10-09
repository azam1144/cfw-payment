import { z } from "zod";
import {v4 as uuidv4} from "uuid";
import { DateTime } from "chanfana";
import {PaymentMethod} from "../const/payment-method";

export const PaymentSchema = z.object({
	id: z.string().default(() => uuidv4()),
	amount: z.number().positive().optional(),
	invoice_id: z.string().optional(),
	payment_method: z.enum(Object.values(PaymentMethod) as [string, ...string[]]).optional(),
	payment_date: DateTime().optional(),
});

export type PaymentInput = z.infer<typeof PaymentSchema>;
export type Payment = PaymentInput & {
	createdAt: string;
	updatedAt: string;
};

export const CreatePaymentSchema = PaymentSchema.omit({ id: true });
