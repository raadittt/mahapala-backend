const dbPool = require("../config/db");

const getAllPerpustakaan = () => {
  const SQLQuery = "SELECT * FROM perpustakaan ORDER BY id_perpustakaan DESC";
  return dbPool.execute(SQLQuery);
};

const getPerpustakaanById = (id) => {
  const SQLQuery = `SELECT * FROM perpustakaan WHERE id_perpustakaan='${id}'`;
  return dbPool.execute(SQLQuery);
};

const createNewPerpustakaan = (body) => {
  const SQLQuery = `INSERT INTO perpustakaan (nama, divisi, kategori, berkas) VALUES (?, ?, ?, ?)`;
  const values = [body.nama, body.divisi, body.kategori, body.berkas];
  return dbPool.execute(SQLQuery, values);
};

const updatePerpustakaan = (body, id) => {
  const SQLQuery = `UPDATE perpustakaan SET nama='${body.nama}', divisi='${body.divisi}', kategori='${body.kategori}', berkas=? WHERE id_perpustakaan='${id}'`;
  return dbPool.execute(SQLQuery, [body.berkas]);
};

const deletePerpustakaan = (id) => {
  const SQLQuery = `DELETE FROM perpustakaan WHERE id_perpustakaan='${id}'`;
  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllPerpustakaan,
  createNewPerpustakaan,
  updatePerpustakaan,
  deletePerpustakaan,
  getPerpustakaanById,
};
