import { NextFunction, Request, Response } from "express";
import dayjs from "dayjs";

const logger = (req: Request, res: Response, next: NextFunction) => {
    console.log(`[${dayjs().format("YYYY-MM-DD:HH:mm:ss")}] Received a ${req.method} request on ${req.path} from ${req.ip}`);
    next();
};

export default logger;
