import { Sequelize } from 'sequelize';

const db = new Sequelize('whn','smart','5m4rt',{
  host:'103.151.140.75',
  dialect:'mysql'
});

export default db;