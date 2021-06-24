import User, {associate as associateUser} from './user';
export * from './sequelize';  //임포트함과 동시에 익스포트하는거

const db = {
  User,
};

export type dbType = typeof db;

associateUser(db);