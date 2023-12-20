const PerpustakaanModel = require("../models/perpustakaan");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvkzpnpgj',
  api_key: '261859215443568',
  api_secret: 'Jvbuo2YRzDNmPY7FMailqTNzlc4',
});

const getAllPerpustakaan = async (req, res) => {
  try {
    const [data] = await PerpustakaanModel.getAllPerpustakaan();

    res.json({
      message: "GET data Perpustakaan success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getPerpustakaanById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await PerpustakaanModel.getPerpustakaanById(id);
    if (data.length === 0) {
      return res.status(404).json({
        message: "Perpustakaan not found",
        data: null,
      });
    }
    res.json({
      message: "GET Perpustakaan data by ID success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewPerpustakaan = async (req, res) => {
  console.log(req.file);
  const { body } = req;
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      body.berkas = result.secure_url; // Simpan URL aman ke dalam database
    }

    await PerpustakaanModel.createNewPerpustakaan(body);
    res.json({
      message: "CREATE new data Perpustakaan success",
      data: {
        ...body,
        berkas: req.file ? req.file.filename : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updatePerpustakaan = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(id);
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      body.berkas = result.secure_url; // Simpan URL aman ke dalam database
    }

    const [data] = await PerpustakaanModel.getPerpustakaanById(id);
    const berkas_lama = data[0].berkas;

    if (berkas_lama) {
      // Hapus berkas lama di Cloudinary
      await cloudinary.uploader.destroy(berkas_lama, { invalidate: true });
    }

    await PerpustakaanModel.updatePerpustakaan(body, id);
    res.json({
      message: "UPDATE data Perpustakaan success",
      data: {
        id: id,
        ...body,
        berkas: req.file ? req.file.filename : null,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const deletePerpustakaan = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await PerpustakaanModel.getPerpustakaanById(id);
    const berkas_lama = data[0].berkas;

    // Hapus file di Cloudinary
    if (berkas_lama) {
      const result = await cloudinary.uploader.destroy(berkas_lama, { invalidate: true });
      console.log(result); // Log hasil penghapusan file dari Cloudinary
    }

    // Hapus data dari database
    await PerpustakaanModel.deletePerpustakaan(id);

    res.json({
      message: "DELETE Perpustakaan success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};


module.exports = {
  getAllPerpustakaan,
  createNewPerpustakaan,
  updatePerpustakaan,
  deletePerpustakaan,
  getPerpustakaanById,
};
