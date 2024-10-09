import {z} from "zod";
import {PaymentSchema} from "../entities/payment.entity";
export const PartialPaymentSchema = PaymentSchema.partial();

export const UpdateSchemaValidator = {
    tags: ["Payments"],
    summary: "Get a single Payment Id",
    request: {
        params: z.object({
            id: z.string({ description: "Payment ID" }),
        }),
        body: {
            content: {
                "application/json": {
                    schema: PartialPaymentSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Returns a single Payment if found",
            content: {
                "application/json": {
                    schema: z.object({
                        success: z.boolean(),
                        result: z.object({
                            data: PaymentSchema,
                        }),
                    }),
                },
            },
        },
        "404": {
            description: "Payment not found",
            content: {
                "application/json": {
                    schema: z.object({
                        success: z.boolean(),
                        error: z.string(),
                    }),
                },
            },
        },
    },
};