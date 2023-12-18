const dbPool = require("../config/db");
const fs = require('fs');

const getAllDokumentasi = () => {
  const SQLQuery = "SELECT * FROM dokumentasi ORDER BY id_dokumentasi DESC";

  return dbPool.execute(SQLQuery);
};

const getDokumentasiById = (id) => {
  const SQLQuery = `SELECT * FROM dokumentasi WHERE id_dokumentasi='${id}'`;
  return dbPool.execute(SQLQuery);
};

const createNewDokumentasi = (body) => {
  const SQLQuery = `INSERT INTO dokumentasi (nama, divisi, kategori, berkas, status, tanggal) VALUES (?, ?, ?, ?, ?, ?)` 
  const values = [body.nama, body.divisi, body.kategori, body.berkas, body.status, body.tanggal];
  return dbPool.execute(SQLQuery, values);
};

const updateDokumentasi = (body, id) => {
  const SQLQuery = `UPDATE dokumentasi SET nama='${body.nama}', divisi='${body.divisi}', kategori='${body.kategori}', berkas='${body.berkas}', status='${body.status}', tanggal='${body.tanggal}' WHERE id_dokumentasi='${id}'`;

  return dbPool.execute(SQLQuery);
};

const deleteDokumentasi = (id) => {
  const SQLQuery = `DELETE FROM dokumentasi WHERE id_dokumentasi='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllDokumentasi,
  createNewDokumentasi,
  updateDokumentasi,
  deleteDokumentasi,
  getDokumentasiById,
};
