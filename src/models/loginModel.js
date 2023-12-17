const dbPool = require("../config/db");

const getUserLoginById = (body) => {
  const SQLQuery = `SELECT * FROM user_login WHERE username = '${body.username}' and password = '${body.password}'`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
    getUserLoginById,
};