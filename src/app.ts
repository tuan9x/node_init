const bodyParser = require("body-parser");
import path from "path";
import express from "express";
import cookieParse from "cookie-parser";
import logger from "morgan";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { api } from "./router";
import { sendErrServer } from "./lib/resp";
import { APP_CONFIG } from "./constant/config";

// Init express and Application middleware
const app = express();

// Set View Engine
// app.set("views", path.join(__dirname, "views") );
// app.set("view engine", "ejs");

app.set("trust proxy", true);

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParse());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (APP_CONFIG.LOG) {
  app.use(logger("dev"));
}

// Api Router
app.get("/ping", function (req, res) {
  res.json("Ping").status(200);
});

// Router
app.use("/api", api);

// 404 Custom
app.use("*", async (req, res) => {
  res.status(400).json("404");
});

// Err handle
app.use(boomErrors);
app.use((err: Error, _req: express.Request, res: express.Response, _next: any) => {
  return sendErrServer(_req, res, "Error");
});

async function boomErrors(error: any, req: express.Request, res: express.Response, next: express.NextFunction) {
  try {
    if (error) {
      return res.json({
        status: 400,
        mess: error.message,
      });
    }
    next();
  } catch (err) {
    return res.json({
      status: 400,
      mess: String(err),
    });
  }
}

export { app };
