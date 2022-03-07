import { webPublicRouter } from "./web";
import express from "express";
const api = express.Router();

/********** Public  *************/
api.use("/web", webPublicRouter);

export { api };
