import express from "express";
const webPublicRouter = express.Router();
import { sendBadReq, sendOk } from "../../lib";
import { getWeb } from "../../service/web";
import { simpleValidate } from "../../validate";

// Router
webPublicRouter.get("/config", simpleValidate, webSettingController);

/* Handle */
async function webSettingController(req: any, res: express.Response) {
  const webSetting: any = await getWeb();
  if (webSetting) return sendOk(req, res, webSetting);
  return sendBadReq(req, res, "404");
}

export { webPublicRouter };
