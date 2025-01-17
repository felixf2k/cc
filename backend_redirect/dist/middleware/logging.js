"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const logger = (req, res, next) => {
    console.log(`[${(0, dayjs_1.default)().format("YYYY-MM-DD:HH:mm:ss")}] Received a ${req.method} request on ${req.path} from ${req.ip}`);
    next();
};
exports.default = logger;
