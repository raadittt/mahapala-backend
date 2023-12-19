const DokumentasiModel = require("../models/dokumentasi");
const fs = require("fs");

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
    await DokumentasiModel.createNewDokumentasi({
      ...body,
      berkas: req.file.filename,
    });
    res.json({
      message: "CREATE new data Dokumentasi success",
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

const updateDokumentasi = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(req.file);
  try {
    const [data] = await DokumentasiModel.getDokumentasiById(id);
    const berkas_lama = data[0].berkas;
    const path = "uploads/" + berkas_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }

      console.log("File deleted successfully.");
    });
    await DokumentasiModel.updateDokumentasi({ ...body, berkas: req.file.filename }, id);
    res.json({
      message: "UPDATE data Dokumentasi success",
      data: {
        id: id,
        ...body,
        berkas: req.file.filename,
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
    const path = "uploads/" + berkas_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }

      console.log("File deleted successfully.");
    });

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