import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { validateEmail } from '../utils/validateEmail';
import { validateName } from '../utils/validateName';
import User from '../models/User';
import sequelize from '../database';
import { Op } from 'sequelize';
import { QueryTypes } from 'sequelize';


export const getUserByEmail = async (req: Request, res: Response) => {
	try {
		const email = req.query.email as string;	

		if (!validateEmail(email)) {
			return res.status(400).json({ message: "Invalid email format" });
		}

		const user = await User.findOne({ where: { email } });

		if (!user) {
			console.log(`User with email ${email} not found`);
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ data: user, message: "User found successfully" });
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface GetUserByTokenRequest extends Request {
	userId?: any;
}

export const getUserByToken = async (req: GetUserByTokenRequest, res: Response) => {
	try {
		const userId = req.userId;

		if (!userId) {
			console.log(`User ID is required`);
			return res.status(404).json({ message: "User ID is required" });
		}

		const user = await User.findByPk(userId);

		if (!user) {
			console.log(`User with ID ${userId} not found`);
			return res.status(404).json({ message: `User  with ID ${userId} not found` });
		}

		return res.status(200).json({ data: user, message: "User found successfully" });

	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}


export const getUserByUsername = async (req: Request, res: Response) => {
	try {
		const username = req.query.username as string;	

		if (!validateName(username)) {
			return res.status(400).json({ message: "Invalid username format" });
		}

		const user = await User.findOne({ where: { username } });

		if (!user) {
			console.log(`User with username ${username} not found`);
			return res.status(404).json({ message: "User not found" });
		}
		return res.status(200).json({ data: user, message: "User found successfully" });
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}


interface DeleteUserRequest {
	userId: number,
}

export const deleteUser = async (req: Request<{}, {}, DeleteUserRequest>, res: Response) => {
	try {
		const { userId } = req.body;

		if (!userId) {
			return res.status(404).json({ message: "User ID is required" });
		}

		await User.destroy({ where: { id: userId } });

		res.status(200).json({ message: "Your account has been deleted successfully" });
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const getUserById = async (req: Request, res: Response) => {
	try {
		const targetId = parseInt(req.params.id);

		if (isNaN(targetId)) {
			return res.status(400).json({ message: "Invalid ID format" });
		}

		const target = User.findByPk(targetId);

		if (!target) {
			return res.status(404).json({ message: "Target not found" });
		}

		return res.status(200).json(target);

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const getThreeRandomUsers = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.id);

		if (isNaN(userId)) {
			return res.status(400).json({ message: "Invalid ID format" });
		}

		if (!userId) {
			return res.status(404).json({ message: "User ID is required" });
		}

		// => raw query
		const users = await sequelize.query('SELECT * FROM "User" WHERE "id" != ? ORDER BY RANDOM() LIMIT 3', {
			replacements: [userId],
			type: QueryTypes.SELECT
		}) as User[];

		if (!users || users.length == 0) {
			return res.status(404).json({ message: "No users found" });
		}

		return res.status(200).json(users);

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}



interface ChangeUsernameRequest {
	userId: number,
	username: string,
}

export const changeUsername = async (req: Request<{}, {}, ChangeUsernameRequest>, res: Response) => {
	try {
		const { userId, username } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "User ID is required" });
		}

		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (!validateName(username)) {
			return res.status(400).json({ message: "Invalid first name" });
		}

		if (username === user.username) {
			console.log("User can't change with the same username");
			return res.status(404).json({ message: "The usernames are the same" });
		}

		const updatedUser = await User.update({ username }, { where: { id: userId }});

		return res.status(200).json({ data: updatedUser, message: "User's username updated successfully" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface ChangePasswordRequest {
	userId: number,
	currentPassword: string,
	newPassword: string,
	confirmNewPassword: string,
}

export const changePassword = async (req: Request<{}, {}, ChangePasswordRequest>, res: Response) => {
	try {
		const { userId, currentPassword, newPassword, confirmNewPassword } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "User ID is required" });
		}

		const user = await User.findByPk(userId);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		if (!(await bcrypt.compare(currentPassword, user.password))) {
			return res.status(401).json({ message: "Incorrect password" });
		}

		if (newPassword !== confirmNewPassword){
			return res.status(401).json({ message: "New password doesn't match" });
		}

		const hashedNewPassword = await bcrypt.hash(newPassword, 10);

		const updatedUser = await User.update({ password: hashedNewPassword }, { where: { id: userId } });

		return res.status(200).json({ data: updatedUser, message: "User's password updated successfully" })
	} catch (err) {
		console.log(err)
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const searchUsers = async (req: Request, res: Response) => {
	try {
		const searchTerm = req.params.term;

		if (!searchTerm || searchTerm.length === 0) {
			return res.status(400).json({ message: "Search term is required." });
		}

		// Search for users where username starts with, ends with, or contains the search term
		const users = await User.findAll({
			where: {
				[Op.or]: [
					{ username: { startsWith: searchTerm } },
					{ username: { contains: searchTerm } },
					{ username: { endsWith: searchTerm } }
				]
			},
			limit: 10
		});

		if (!users || users.length === 0) {
			return res.status(200).json({ message: "No users found." });
		}

		return res.status(200).json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error." });
	}
};

interface UpdateUserDetailsRequest {
	userId: number;
	username?: string;
	location?: string;
	job?: string;
}

export const updateUserDetails = async (req: Request<{}, {}, UpdateUserDetailsRequest>, res: Response) => {
	try {
		const { userId, username, location, job } = req.body;

		if (!userId) {
			return res.status(400).json({ message: "User ID is required" });
		}

		if (username && !validateName(username)) {
			return res.status(400).json({ message: "Invalid username format" });
		}

		const existingUser = await User.findByPk(userId);

		if (!existingUser) {
			return res.status(404).json({ message: "User not found" });
		}

		const usernameTaken = await User.findOne({ where: { username }});

		if (usernameTaken) {
			return res.status(404).json({ message: "Username already taken" });
		}

		const updatedUser = User.update({
				username: existingUser.username, 
				location: existingUser.location,
				job: existingUser.job 
			}, {
				where: { id: userId }
			}
		)

		return res.status(200).json({ data: updatedUser, message: "User details updated successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}
