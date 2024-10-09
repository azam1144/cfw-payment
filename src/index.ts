import { Hono } from "hono";
import { fromHono } from "chanfana";
import { CreatePaymentService } from "./services/create.service";
import { ListAllPayments } from "./services/list.service";
import { OnePaymentService } from "./services/one.service";
import { UpdatePaymentService } from "./services/update.service";
import { DeletePaymentService } from "./services/delete.service";
import { StaticTypesService } from "./services/static-types.service";

const app = new Hono();

const openapi = fromHono(app, {
	docs_url: "/",
});

openapi.get("/api/v0.1/payment/static-enums", StaticTypesService);
openapi.get("/api/v0.1/payment", ListAllPayments);
openapi.post("/api/v0.1/payment", CreatePaymentService);
openapi.get("/api/v0.1/payment/one/:id", OnePaymentService);
openapi.patch("/api/v0.1/payment/:id", UpdatePaymentService);
openapi.delete("/api/v0.1/payment/:id", DeletePaymentService);

export default app;
