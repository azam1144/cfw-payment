import {z} from "zod";
import {Bool, Num} from "chanfana";
import {PaymentSchema} from "../entities/payment.entity";

export const listSchemaValidator = {
    tags: ["Payments"],
    summary: "List Service Payments",
    request: {
        query: z.object({
            page: Num({
                description: "Page number",
                default: 1,
                required: false,
                example: 1,
            }),
        }),
    },
    responses: {
        "200": {
            description: "Returns a list of Payments",
            content: {
                "application/json": {
                    schema: z.object({
                        success: Bool(),
                        result: z.object({
                            data: PaymentSchema.array(),
                        }),
                        pagination: z.object({
                            currentPage: z.number(),
                            totalPages: z.number(),
                            totalCount: z.number(),
                        }),
                    }),
                },
            },
        },
    },
};