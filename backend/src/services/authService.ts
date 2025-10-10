import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const registerUser = async (email: string, password: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.create({
        data: { email, password: hashedPassword }
    });
};

export const loginUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error("Invalid password");

    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "secret", { expiresIn: "1h" });
};
    