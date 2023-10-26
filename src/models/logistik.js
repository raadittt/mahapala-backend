const dbPool = require("../config/db");

const getAllLogistik = () => {
  const SQLQuery = "SELECT * FROM logistik;";

  return dbPool.execute(SQLQuery);
};

const getLogistikById = (id) => {
  const SQLQuery = `SELECT * FROM logistik WHERE id_logistik='${id}'`;
  return dbPool.execute(SQLQuery);
};

const createNewLogistik = (body) => {
  const SQLQuery = `INSERT INTO logistik (nama, qty, kondisi) VALUES ('${body.nama}', '${body.qty}','${body.kondisi}')`;

  return dbPool.execute(SQLQuery);
};

const updateLogistik = (body, id) => {
  const SQLQuery = `UPDATE logistik SET nama='${body.nama}', qty='${body.qty}', kondisi='${body.kondisi}' WHERE id_logistik='${id}'`;

  return dbPool.execute(SQLQuery);
};

const deleteLogistik = (id) => {
  const SQLQuery = `DELETE FROM logistik WHERE id_logistik='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllLogistik,
  createNewLogistik,
  updateLogistik,
  deleteLogistik,
  getLogistikById
};
