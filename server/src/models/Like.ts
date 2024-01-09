import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Post from './Post';
import User from './User';


interface LikeAttributes {
  id?: number;
  postId: number;
  userId: number;
}

class Like extends Model<LikeAttributes> implements LikeAttributes {
  public id!: number;
  public postId!: number;
  public userId!: number;
}

Like.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  postId:  {
		type: DataTypes.INTEGER,
	},
  userId:  {
		type: DataTypes.INTEGER,
	}
}, { sequelize, modelName: 'Like' });

Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' });
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Like;
