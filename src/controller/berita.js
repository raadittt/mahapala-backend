const BeritaModel = require("../models/berita");
const fs = require("fs");

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

const getBeritaById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await BeritaModel.getBeritaById(id);
    if (data.length === 0) {
      return res.status(404).json({
        message: "Berita not found",
        data: null,
      });
    }
    res.json({
      message: "GET Berita data by ID success",
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
  console.log(req.file);
  const { body } = req;
  try {
    await BeritaModel.createNewBerita({
      ...body,
      gambar: req.file.filename,
    });

    res.json({
      message: "CREATE new data Berita success",
      data: {
        ...body,
        file: req.file.filename,
      },
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
  console.log(id);
  try {
    const [data] = await BeritaModel.getBeritaById(id);
    const gambar_lama = data[0].gambar;
    const path = "uploads/" + gambar_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }

      console.log("File deleted successfully.");
    });
    await BeritaModel.updateBerita({ ...body, gambar: req.file.filename }, id);
    res.json({
      message: "UPDATE data Berita success",
      data: {
        id: id,
        ...body,
        gambar: req.file.filename,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deleteBerita = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await BeritaModel.getBeritaById(id);
    const gambar_lama = data[0].gambar;
    const path = "uploads/" + gambar_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }
      console.log("File deleted successfully.");
    });
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

module.exports = { getAllBerita, getBeritaById, createNewBerita, updateBerita, deleteBerita };
