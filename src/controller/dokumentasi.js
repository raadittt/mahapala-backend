const DokumentasiModel = require("../models/dokumentasi");
const fs = require("fs");
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dvkzpnpgj',
  api_key: '261859215443568',
  api_secret: 'Jvbuo2YRzDNmPY7FMailqTNzlc4',
});

const getAllDokumentasi = async (req, res) => {
  try {
    const [data] = await DokumentasiModel.getAllDokumentasi();

    res.json({
      message: "GET data Dokumentasi success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const getDokumentasiById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await DokumentasiModel.getDokumentasiById(id);
    if (data.length === 0) {
      return res.status(404).json({
        message: "Dokumentasi not found",
        data: null,
      });
    }
    res.json({
      message: "GET Dokumentasi data by ID success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewDokumentasi = async (req, res) => {
  console.log(req.file);
  const { body } = req;
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      body.berkas = result.secure_url; // Simpan URL aman ke dalam database
    }

    await DokumentasiModel.createNewDokumentasi(body);
    res.json({
      message: "CREATE new data Dokumentasi success",
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

const updateDokumentasi = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(req.file);
  try {
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      body.berkas = result.secure_url; // Simpan URL aman ke dalam database
    }

    const [data] = await DokumentasiModel.getDokumentasiById(id);
    const berkas_lama = data[0].berkas;

    if (berkas_lama) {
      // Hapus berkas lama di Cloudinary
      await cloudinary.uploader.destroy(berkas_lama, { invalidate: true });
    }

    await DokumentasiModel.updateDokumentasi(body, id);
    res.json({
      message: "UPDATE data Dokumentasi success",
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

const deleteDokumentasi = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await DokumentasiModel.getDokumentasiById(id);
    const berkas_lama = data[0].berkas;

    // Hapus file di Cloudinary
    if (berkas_lama) {
      const result = await cloudinary.uploader.destroy(berkas_lama, { invalidate: true });
      console.log(result); // Log hasil penghapusan file dari Cloudinary
    }

    // Hapus data dari database
    await DokumentasiModel.deleteDokumentasi(id);

    res.json({
      message: "DELETE Dokumentasi success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

module.exports = { getAllDokumentasi, createNewDokumentasi, updateDokumentasi, deleteDokumentasi, getDokumentasiById };