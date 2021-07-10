import { Request, Response, NextFunction } from "express";

function sendOk (req: Request, res: Response, data: any) {
    return res.status(200).json({
        status: 200,
        data
    });
}

function sendBadReq (req: Request, res: Response, mess: any) {
    return res.status(400).json({
        status: 400,
        mess
    });
}

function sendForbidden (req: Request, res: Response, mess: any) {
    return res.status(403).json({
        status: 403,
        mess
    });
}

function sendErrServer (req: Request, res: Response, mess: any) {
    return res.status(500).json({
        status: 500,
        mess
    });
}

export {
    sendOk, sendBadReq, sendForbidden, sendErrServer
};