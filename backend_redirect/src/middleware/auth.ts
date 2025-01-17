import { NextFunction, Request, Response } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if (!token) {
        res.status(401).send("Token missing");
        return;
    }

    const validToken = process.env.TOKEN || "changeme";
    if (!validToken) {
        res.status(500).send("Env missing");
        return;
    }

    if (validToken !== token) {
        res.status(401).send("Invalid Token");
        return;
    }

    next();
}

export default authMiddleware;
