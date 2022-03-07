import express from "express";
import { celebrate, Joi } from "celebrate";
import { sendBadReq } from "../../lib";

const simpleValidate = [
  celebrate(
    {
      query: Joi.object().keys({
        id: Joi.number().required().error(new Error("id invalid")),
      }),
      // params: Joi.object().keys({
      //     id: Joi.number().required().error(new Error("id invalid"))
      // }),
      // body: Joi.object().keys({
      //     status: Joi.string().required().error(new Error("status invalid"))
      // })
    },
    { stripUnknown: true }
  ),
  async function (req, res, next) {
    next();
  },
];

export { simpleValidate };
