import { Sequelize } from 'sequelize';

const DATABASE_STRING = process.env.DATABASE_STRING as string;
const sequelize = new Sequelize(DATABASE_STRING);

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

export default sequelize;
