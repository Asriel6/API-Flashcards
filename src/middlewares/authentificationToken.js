import jwt from "jsonwebtoken";
import { request } from "express";
import "dotenv/config.js";

/**
 *
 * @param {request} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const authenticatetoken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ error: "Token is required" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
        userId: decoded.userId,
        role: decoded.role,
        };

        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid Token" });
    }
};
