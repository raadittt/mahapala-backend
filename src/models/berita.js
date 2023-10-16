const dbPool = require("../config/db");

const getAllBerita = () => {
  const SQLQuery = "SELECT * FROM berita;";

  return dbPool.execute(SQLQuery);
};

const createNewBerita = (body) => {
  const SQLQuery = `INSERT INTO berita (judul, gambar, deskripsi) VALUES ('${body.judul}','${body.gambar}', '${body.deskripsi}')`;

  return dbPool.execute(SQLQuery);
};

const updateBerita = (body, id) => {
  const SQLQuery = `UPDATE berita SET judul='${body.judul}', gambar='${body.gambar}', deskripsi='${body.deskripsi}' WHERE id_berita='${id}'`;

  return dbPool.execute(SQLQuery);
};

const deleteBerita = (id) => {
  const SQLQuery = `DELETE FROM berita WHERE id_berita='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllBerita,
  createNewBerita,
  updateBerita,
  deleteBerita,
};
