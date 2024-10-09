import {z} from "zod";
import {Bool, Str} from "chanfana";
import {PaymentSchema} from "../entities/payment.entity";

export const OneSchemaValidator = {
    tags: ["Payments"],
    summary: "Get One Service",
    request: {
        params: z.object({
            id: Str({ description: "Payment ID" }),
        }),
    },
    responses: {
        "200": {
            description: "Returns a payment details",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({
                            data: PaymentSchema.array(),
                        })
                    }),
                },
            },
        },
    },
};