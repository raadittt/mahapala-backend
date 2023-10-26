const dbPool = require("../config/db");

const getAllUsers = () => {
  const SQLQuery = "SELECT * FROM users;";

  return dbPool.execute(SQLQuery);
};

const getUserById = (id) => {
  const SQLQuery = `SELECT * FROM users WHERE id_user='${id}'`;
  return dbPool.execute(SQLQuery);
};

const createNewUser = (body) => {
  const SQLQuery = `INSERT INTO users (npm, nama, tanggal_lahir, telepon, alamat, status, level) VALUES ('${body.npm}', '${body.nama}', '${body.tanggal_lahir}',' ${body.telepon}', '${body.alamat}', '${body.status}', '${body.level}')`;

  return dbPool.execute(SQLQuery);
};

const updateUser = (body, id) => {
  const SQLQuery = `UPDATE users SET npm='${body.npm}', nama='${body.nama}', tanggal_lahir='${body.tanggal_lahir}', telepon=' ${body.telepon}', alamat='${body.alamat}', status='${body.status}', level='${body.level}' WHERE id_user='${id}'`;

  return dbPool.execute(SQLQuery);
};

const deleteUser = (id) => {
  const SQLQuery = `DELETE FROM users WHERE id_user='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUser,
  deleteUser,
  getUserById,
};
