import koa from "koa";
import bodyparser from "koa-bodyparser";
import loggerKoa from "koa-logger";
import cors from "koa2-cors";
import TripsRouter from './routes/trips/trips.routes'

const app = new koa();

// middlewares
app.use(cors());
app.use(loggerKoa());
app.use(bodyparser());

// routes
app.use(TripsRouter.routes());

export default app;
