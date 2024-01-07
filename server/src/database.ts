import { Sequelize } from 'sequelize';

const DATABASE_STRING = "postgres://postgres:admin@localhost:5432/internshiptraining"
const sequelize = new Sequelize(DATABASE_STRING, {
	dialect: 'postgres',
});

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;