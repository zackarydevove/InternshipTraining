import { Model, DataTypes } from 'sequelize';
import sequelize from '../database';

interface UserAttributes {
	id?: number;
	email: string;
	password: string;
	username: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
	public id!: number;
	public email!: string;
	public password!: string;
	public username!: string;
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
    }
}, {
    sequelize,
    modelName: 'User',
    timestamps: true,
});

export default User;
