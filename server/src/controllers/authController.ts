import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User';

interface LoginRequestBody {
    email: string;
    password: string;
}

export const login = async (req: Request<{}, {}, LoginRequestBody>, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email }
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

interface RegisterRequestBody {
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
}

export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
	try {
			const { email, password, confirmPassword, username } = req.body;

			const existingUser = await User.findOne({
					where: { email }
			});

			if (existingUser) {
					return res.status(400).json({ message: "Email already used" });
			}

			if (password !== confirmPassword) {
					return res.status(400).json({ message: "Passwords don't match" });
			}

			const hashedPassword = await bcrypt.hash(password, 10);

			const newUser = await User.create({
					email,
					password: hashedPassword,
					username
			});

			const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET as string);

			return res.status(200).json({ token, message: "You have successfully created a new account." });
	} catch (error) {
			console.error("Error registering:", error);
			return res.status(500).json({ message: "Internal server error" });
	}
};
