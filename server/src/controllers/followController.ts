import { Request, Response } from "express"
import User from '../models/User';
import Follow from '../models/Follow';

interface FollowUserRequest {
	userId: number,
	targetId: number,
}

export const followUser = async (req: Request<{}, {}, FollowUserRequest>, res: Response) => {
	try {
		const { userId, targetId } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		if (userId === targetId) {
			return res.status(400).json({ message: "You cannot follow yourself." });
		}

		const targetUser = await User.findByPk(targetId);

		if (!targetUser) {
			return res.status(404).json({ message: "Target user not found" });
		}

		const existingFollow = await Follow.findOne({
			where: {
				followerId: userId,
				followingId: targetId,
			},
		});

		if (existingFollow) {
			await Follow.destroy({
				where: { id: existingFollow.id }
			});

			// -1 followersCount
			await User.decrement('followersCount', { where: { id: userId} });

			return res.status(200).json({ message: "Unfollowed successfully" });
		}

		const newFollow = await Follow.create({
			followerId: userId,
			followingId: targetId,
		})

		await User.increment('followersCount', { where: { id: userId } });

		return res.status(200).json({ data: newFollow, message: "Followed successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const checkFollow = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.query.userId as string);
		const targetId = parseInt(req.query.targetId as string);

		if (!userId || !targetId) {
			return res.status(401).json({ message: "Need userId and targetId" });
		}

		const follow = await Follow.findOne({
			where: {
				followerId: userId,
				followingId: targetId,
			}
		})

		if (follow) {
			return res.status(200).json({ isFollowing: true });
		} else {
			return res.status(200).json({ isFollowing: false });
		}

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}
