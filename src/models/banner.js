const dbPool = require("../config/db");

const getAllBanner = () => {
  const SQLQuery = "SELECT * FROM banner;";

  return dbPool.execute(SQLQuery);
};

const getBannerById = (id) => {
  const SQLQuery = `SELECT * FROM banner WHERE id_banner='${id}'`;
  return dbPool.execute(SQLQuery);
};

const createNewBanner = (body) => {
  const SQLQuery = `INSERT INTO banner (title, gambar) VALUES (?, ?)`;
  const values = [body.title, body.gambar];
  return dbPool.execute(SQLQuery, values);
};

const updateBanner = (body, id) => {
  const SQLQuery = `UPDATE banner SET title='${body.title}', gambar=? WHERE id_banner='${id}'`;

  return dbPool.execute(SQLQuery, [body.gambar]);
};

const deleteBanner = (id) => {
  const SQLQuery = `DELETE FROM banner WHERE id_banner='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllBanner,
  getBannerById,
  createNewBanner,
  updateBanner,
  deleteBanner,
};
