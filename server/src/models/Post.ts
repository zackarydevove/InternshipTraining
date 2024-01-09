import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './User';
import Comment from './Comment';
import Like from './Like';

interface PostAttributes {
  id?: number;
  creatorId: number;
  content: string;
  likesCount?: number;
  commentsCount?: number;
}

class Post extends Model<PostAttributes> implements PostAttributes {
  public id!: number;
  public creatorId!: number;
  public content!: string;
  public likesCount!: number;
  public commentsCount!: number;
}

Post.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  creatorId:  {
		type: DataTypes.INTEGER,
	},
  content:  {
		type: DataTypes.STRING,
	},
  likesCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  commentsCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, { sequelize, modelName: 'Post' });

Post.belongsTo(User, { foreignKey: 'creatorId', as: 'creator' });
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes' });
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' });

export default Post;
