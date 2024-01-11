import { Request, Response } from 'express'
import Post from '../models/Post';
import User from '../models/User';
import Like from '../models/Like';
import Comment from '../models/Comment';

interface CreatePostRequest {
	userId: number,
	content: string
}

export const createPost = async (req: Request<{}, {}, CreatePostRequest>, res: Response) => {
	try {
		const { userId, content } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		const newPost = await Post.create({
			creatorId: userId,
			content: content,
		})

		return res.status(200).json({ data: newPost, message: "New post created successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface DeletePostRequest {
	userId: number,
	postId: number,
}

export const deletePost = async (req: Request<{}, {}, DeletePostRequest>, res: Response) => {
	try {
		const { userId, postId } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		const post = await Post.findByPk(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		if (post.creatorId !== userId) {
			return res.status(403).json({ message: "You're not authorized to delete this post" });
		}
		await Post.destroy({ where: { id: postId } });

		return res.status(200).json({ message: "Post has been deleted successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface LikePostRequest {
	userId: number,
	postId: number
}

export const likePost = async (req: Request<{}, {}, LikePostRequest>, res: Response) => {
	try {
		const { userId, postId } = req.body;

		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		const post = await Post.findByPk(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		const existingLike = await Like.findOne({
			where: {
				postId: postId,
				userId: userId
			}
		})

		if (existingLike) {
			await Like.destroy({ where: { id: existingLike.id }});
			const updatedPost = await Post.decrement('likesCount', { where: { id: postId }});
			return res.status(200).json({ data: updatedPost, likeCount: -1, message: "You have unliked successfully" });
		}

		await Like.create({
			postId: postId,
			userId: userId,
		})

		const updatedPost = Post.increment('likesCount', { where: { id: postId }});

		return res.status(200).json({ data: updatedPost, likeCount: 1, message: "You have liked successfully" });

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

// J'EN SUIS LA
export const checkUserLikedPost = async (req: Request, res: Response) => {
	try {
		const userId = parseInt(req.query.userId as string);
		const postId = parseInt(req.query.postId as string);

		if (!userId || !postId) {
			return res.status(401).json({ message: "user and post ID are necessary" });
		}

		const post = await Post.findByPk(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		const existingLike = await Like.findOne({
			where: {
				postId: postId,
				userId: userId
			}
		})

		const userAlreadyLiked = existingLike ? true : false

		return res.status(200).json({ data: userAlreadyLiked, message: "You have liked successfully" });

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface CommentPostRequest {
	userId: number,
	postId: number,
	content: string,
}

export const commentPost = async (req: Request<{}, {}, CommentPostRequest>, res: Response) => {
	try {
		const { userId, postId, content } = req.body;

		// Check if user is authorized
		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		// Check if post exists
		const post = await Post.findByPk(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		const newComment = await Comment.create({
			postId,
			userId,
			content
		})

		const updatedPost = await Post.increment('commentsCount', { where: { id: postId } } );

		return res.status(200).json({ data: newComment, commentCount: 1, message: "Comment posted successfully" });

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

interface DeleteCommentRequest {
	userId: number;
	commentId: number;
}

export const deleteComment = async (req: Request<{}, {}, DeleteCommentRequest>, res: Response) => {
	try {
		const userId = parseInt(req.query.userId as string);
		const commentId = parseInt(req.query.commentId as string);

		// Check if user is authorized
		if (!userId) {
			return res.status(401).json({ message: "You are not authorized" });
		}

		// Check if comment exists
		const comment = await Comment.findByPk(commentId);

		if (!comment) {
			return res.status(404).json({ message: "Comment not found" });
		}

		// Check if user is the author of the comment
		if (comment.userId !== userId) {
			return res.status(403).json({ message: "You're not authorized to delete this comment" });
		}

		// Delete the comment
		await Comment.destroy({ where: { id: commentId } })

		const updatedPost = await Post.decrement('commentsCount', { where: { id: comment.postId } } );

		return res.status(200).json({ commentCount: -1, message: "Comment has been deleted successfully" });

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}

export const getPostComments = async (req: Request, res: Response) => {
	try {
		const postId = parseInt(req.query.postId as string);

		if (!postId) {
			return res.status(401).json({ message: "post ID is necessary" });
		}

		const post = await Post.findByPk(postId);

		if (!post) {
			return res.status(404).json({ message: "Post not found" });
		}

		const comments = await Comment.findAll({
			where: {
				postId: postId,
			},
			include: [
				{ model: User, as: 'user'}
			]
		})

		return res.status(200).json({ data: comments || [], message: "You have liked successfully" });

	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Internal server error" });
	}
}
