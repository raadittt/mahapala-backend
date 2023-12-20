const BeritaModel = require("../models/berita");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvkzpnpgj',
  api_key: '261859215443568',
  api_secret: 'Jvbuo2YRzDNmPY7FMailqTNzlc4',
});

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
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      body.gambar = result.secure_url; // Simpan URL aman ke dalam database
    }

    await BeritaModel.createNewBerita(body);
    res.json({
      message: "CREATE new data Berita success",
      data: {
        ...body,
        gambar: req.file ? req.file.filename : null,
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
  console.log(req.file);
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      body.gambar = result.secure_url; // Simpan URL aman ke dalam database
    }

    const [data] = await BeritaModel.getBeritaById(id);
    const gambar_lama = data[0].gambar;

    if (gambar_lama) {
      // Hapus gambar lama di Cloudinary
      await cloudinary.uploader.destroy(gambar_lama, { invalidate: true });
    }

    await BeritaModel.updateBerita(body, id);
    res.json({
      message: "UPDATE data Berita success",
      data: {
        id: id,
        ...body,
        gambar: req.file ? req.file.filename : null,
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
    const [data] = await BeritaModel.getBeritaById(id);
    const gambar_lama = data[0].gambar;

    // Hapus file di Cloudinary
    if (gambar_lama) {
      const result = await cloudinary.uploader.destroy(gambar_lama, { invalidate: true });
      console.log(result); // Log hasil penghapusan file dari Cloudinary
    }

    // Hapus data dari database
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
