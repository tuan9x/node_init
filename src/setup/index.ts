require("pg").defaults.parseInt8 = true;
import { WebModel, PageModel, CategoryModel } from "./../model";
import { Sequelize } from "sequelize-typescript";
import { DATABASE_CONFIG } from "../constant/config";
import { initDataConfig } from "./initConfig";

const sequelize = new Sequelize(DATABASE_CONFIG);

const models: any = [WebModel, PageModel, CategoryModel];

async function initModels() {
  sequelize.addModels(models);
  console.log(">>>>>>>>>> Sequeliuze model initiated");
}

async function dbConnect() {
  try {
    await sequelize.authenticate();
    console.log(">>>>>> Connnect to database success !!");
    await sequelize.sync({ force: false }); // alter: true => Should not use
  } catch (err) {
    console.log({ err: String(err) });
  }
}

export { initModels, sequelize, dbConnect, initDataConfig };
