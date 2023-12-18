const dbPool = require("../config/db");

const getAllKategori = () => {
  const SQLQuery = "SELECT * FROM kategori ORDER BY id_kategori DESC";

  return dbPool.execute(SQLQuery);
};

const createNewKategori = (body) => {
  const SQLQuery = `INSERT INTO kategori (nama) VALUES ('${body.nama}')`;

  return dbPool.execute(SQLQuery);
};

const updateKategori = (body, id) => {
  const SQLQuery = `UPDATE kategori SET nama='${body.nama}' WHERE id_kategori=${id}`;

  return dbPool.execute(SQLQuery);
};

const deleteKategori = (id) => {
  const SQLQuery = `DELETE FROM kategori WHERE id_kategori='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllKategori,
  createNewKategori,
  updateKategori,
  deleteKategori,
};
