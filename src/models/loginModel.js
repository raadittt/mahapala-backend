const dbPool = require("../config/db");

const getUserLoginByNPM = (body) => {
  const SQLQuery = `SELECT * FROM users WHERE npm = '${body.npm}' and tanggal_lahir = '${body.tanggal_lahir}'`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
    getUserLoginByNPM,
};