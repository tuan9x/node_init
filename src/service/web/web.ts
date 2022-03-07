import * as lib from "../../lib";
import { PageModel, WebModel, CategoryModel } from "../../model";

async function getWeb() {
  // Find On DB
  const web = await WebModel.findAndCountAll({
    // where: {
    //     code: pageCode
    // },
    // attributes: {
    // exclude: ["id", "createdAt", "updatedAt", "deletedAt"]
    // },
    include: [
      {
        model: PageModel,
      },
      {
        model: CategoryModel,
      },
    ],
  });
  return web;
}

export { getWeb };
