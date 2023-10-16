const dbPool = require("../config/db");

const getAllPerpustakaan = () => {
  const SQLQuery = "SELECT * FROM perpustakaan;";

  return dbPool.execute(SQLQuery);
};

const createNewPerpustakaan = (body) => {
  const SQLQuery = `INSERT INTO perpustakaan (nama, divisi, kategori, berkas) VALUES ('${body.nama}', '${body.divisi}','${body.kategori}','${body.berkas}')`;

  return dbPool.execute(SQLQuery);
};

const updatePerpustakaan = (body, id) => {
  const SQLQuery = `UPDATE perpustakaan SET nama='${body.nama}', divisi='${body.divisi}', kategori='${body.kategori}', berkas='${body.berkas}'WHERE id_perpustakaan='${id}'`;

  return dbPool.execute(SQLQuery);
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
};
