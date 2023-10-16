const dbPool = require("../config/db");

const getAllBanner = () => {
  const SQLQuery = "SELECT * FROM banner;";

  return dbPool.execute(SQLQuery);
};

const createNewBanner = (body) => {
  const SQLQuery = `INSERT INTO banner (title, gambar) VALUES ('${body.title}','${body.gambar}')`;

  return dbPool.execute(SQLQuery);
};

const updateBanner = (body, id) => {
  const SQLQuery = `UPDATE banner SET title='${body.title}', gambar='${body.gambar}' WHERE id_banner='${id}'`;

  return dbPool.execute(SQLQuery);
};

const deleteBanner = (id) => {
  const SQLQuery = `DELETE FROM banner WHERE id_banner='${id}'`;

  return dbPool.execute(SQLQuery);
};

module.exports = {
  getAllBanner,
  createNewBanner,
  updateBanner,
  deleteBanner,
};
