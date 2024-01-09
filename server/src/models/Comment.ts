import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Post from './Post';
import User from './User';

interface CommentAttributes {
  id?: number;
  postId: number;
  userId: number;
  content: string;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: number;
  public postId!: number;
  public userId!: number;
  public content!: string;
}

Comment.init({
		id: {
			type: DataTypes.INTEGER,
		},
		postId: {
			type: DataTypes.INTEGER,
		},
		userId: {
			type: DataTypes.INTEGER,
		},
		content: {
			type: DataTypes.STRING,
		},
	}, {
		sequelize,
		modelName: 'Comment',
		timestamps: true,
	}
)

Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Comment;