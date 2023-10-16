const BeritaModel = require("../models/berita");

const getAllBerita = async (req, res) => {
  try {
    const [data] = await BeritaModel.getAllBerita();

    res.json({
      message: "GET data Berita success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewBerita = async (req, res) => {
  const { body } = req;
  try {
    await BeritaModel.createNewBerita(body);
    res.json({
      message: "CREATE new data Berita success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateBerita = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await BeritaModel.updateBerita(body, id);
    res.json({
      message: "UPDATE data Berita success",
      data: {
        id: id,
        ...body,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteBerita = async (req, res) => {
  const { id } = req.params;
  try {
    await BeritaModel.deleteBerita(id);
    res.json({
      message: "DELETE Berita success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
module.exports = { getAllBerita, createNewBerita, updateBerita, deleteBerita };
