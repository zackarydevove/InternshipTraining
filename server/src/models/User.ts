import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';
import Post from './Post';
import Follow from './Follow';
import Like from './Like';
import Comment from './Comment';

interface UserAttributes {
	id?: number;
	email: string;
	password: string;
	username: string;
  location?: string;
  job?: string;
  followersCount?: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
	public id!: number;
	public email!: string;
	public password!: string;
	public username!: string;
  public location!: string;
  public job!: string;
  public followersCount!: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
		location: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		job: {
			type: DataTypes.STRING,
			defaultValue: ""
		},
		followersCount: {
			type: DataTypes.INTEGER,
			defaultValue: 0
		}
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
});

User.hasMany(Post, { foreignKey: 'creatorId', as: 'posts' });
User.hasMany(Like, { foreignKey: 'userId', as: 'likes' });
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' });
User.hasMany(Follow, { foreignKey: 'followerId', as: 'followers' });
User.hasMany(Follow, { foreignKey: 'followingId', as: 'following' });

export default User;
