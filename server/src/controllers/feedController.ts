import { Request, Response } from "express";
import Post from '../models/Post';
import User from '../models/User';
import Follow from "../models/Follow";
import Comment from "../models/Comment";

export const getFeed = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId as string);
		const page =  parseInt(req.query.page as string);

		if (!userId) {
			return res.status(401).json({ message: "User ID is required" });
		}

		const pageNumber = page <= 0 ? page : 1;

		// Fetch users the main user is following
		const following = await Follow.findAll({
			where: {
				followerId: userId
			},
			attributes: ['followingId']
		})

		const followingIds = following.map(f => f.followingId);
		followingIds.push(userId);

		// Fetch the 10 most recent posts created by the users the main user is following
		const posts = await Post.findAll({
			where: { creatorId: followingIds },
			limit: 10,
			offset: (page - 1) * 10,
			order: [['createdAt', 'DESC']],
			include: [
				{ model: User, as: 'creator' },
				{
					model: Comment,
					limit: 1,
					order: [['createdAt', 'DESC']],
					include: [{ model: User, as: 'user' }]
				}
			]
		});

		return res.status(200).json(posts);

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const getUserPosts = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.params.userId as string);
		const page =  parseInt(req.query.page as string);

		if (!userId) {
			return res.status(401).json({ message: "User ID is required" });
		}

		const pageNumber = page <= 0 ? page : 1;

		const posts = await Post.findAll({
			where: { creatorId: userId },
			limit: 10,
			offset: (page - 1) * 10,
			order: [['createdAt', 'DESC']],
			include: [
				{ model: User, as: 'creator' },
				{
					model: Comment,
					limit: 1,
					order: [['createdAt', 'DESC']],
					include: [{ model: User, as: 'user' }]
				}
			]
		});
		return res.status(200).json(posts);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: 'Internal server error' });
	}
};
