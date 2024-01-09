import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import User from './User';

interface FollowAttributes {
  id?: number;
  followerId: number;
  followingId: number;
  createdAt?: Date;
}

class Follow extends Model<FollowAttributes> implements FollowAttributes {
  public id!: number;
  public followerId!: number;
  public followingId!: number;
  public createdAt!: Date;
}

Follow.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  followerId: {
		type: DataTypes.INTEGER,
	},
  followingId:{
		type: DataTypes.INTEGER,
	},
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, { sequelize, modelName: 'Follow' });

Follow.belongsTo(User, { foreignKey: 'followerId', as: 'follower' });
Follow.belongsTo(User, { foreignKey: 'followingId', as: 'following' });

export default Follow;
