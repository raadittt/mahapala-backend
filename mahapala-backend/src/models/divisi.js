const dbPool = require("../config/db");

const getAllDivisi = () => {
  const SQLQuery = "SELECT * FROM divisi;";

  return dbPool.execute(SQLQuery);
};

const createNewDivisi = (body) => {
  const SQLQuery = `INSERT INTO divisi (nama) VALUES ('${body.nama}')`;

  return dbPool.execute(SQLQuery);
};

const updateDivisi = (body, id) => {
  const SQLQuery = `UPDATE divisi SET nama='${body.nama}' WHERE id_divisi=${id}`;

  return dbPool.execute(SQLQuery);
};

const deleteDivisi = (id) => {
  const SQLQuery = `DELETE FROM divisi WHERE id_divisi='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllDivisi,
  createNewDivisi,
  updateDivisi,
  deleteDivisi,
};
