import { Request, Response } from "express";
import { loginUser, registerUser } from "../services/authService";

export const register = async (req: Request, res: Response) => {
    try {
        const user = await registerUser(req.body.email, req.body.password);
        res.status(201).json(user);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const token = await loginUser(req.body.email, req.body.password);
        res.status(200).json({ token });
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};
