import {z} from "zod";
import {Bool, Str} from "chanfana";
import {PaymentSchema} from "../entities/payment.entity";

export const DeleteSchemaValidator = {
    tags: ["Admin Operation"],
    summary: "Delete Service a Payment",
    request: {
        params: z.object({
            id: Str({ description: "Payment ID" }),
        }),
    },
    responses: {
        "200": {
            description: "Returns if the Payment was deleted successfully",
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