const dbPool = require("../config/db");

const getAllBerita = () => {
  const SQLQuery = "SELECT * FROM berita ORDER BY id_berita DESC";

  return dbPool.execute(SQLQuery);
};

const getBeritaById = (id) => {
  const SQLQuery = `SELECT * FROM berita WHERE id_berita='${id}'`;
  return dbPool.execute(SQLQuery);
};

const createNewBerita = (body) => {
  const SQLQuery = `INSERT INTO berita (judul, gambar, deskripsi) VALUES (?, ?, ?)`;
  const values = [body.judul, body.gambar, body.deskripsi];
  return dbPool.execute(SQLQuery, values);
};

const updateBerita = (body, id) => {
  const SQLQuery = `UPDATE berita SET judul='${body.judul}', gambar=?, deskripsi='${body.deskripsi}' WHERE id_berita='${id}'`;

  return dbPool.execute(SQLQuery, [body.gambar]);
};

const deleteBerita = (id) => {
  const SQLQuery = `DELETE FROM berita WHERE id_berita='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllBerita,
  getBeritaById,
  createNewBerita,
  updateBerita,
  deleteBerita,
};
