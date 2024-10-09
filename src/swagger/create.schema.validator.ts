import {z} from "zod";
import {Bool} from "chanfana";
import {CreatePaymentSchema, PaymentSchema} from "../entities/payment.entity";

export const createSchemaValidator = {
    tags: ["Payments"],
    summary: "CreateService a new Payment",
    request: {
        body: {
            content: {
                "application/json": {
                    schema: CreatePaymentSchema,
                },
            },
        },
    },
    responses: {
        "200": {
            description: "Returns the created Payment",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({
                            data: PaymentSchema,
                        }),
                    }),
                },
            },
        },
    },
};