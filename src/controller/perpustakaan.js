const PerpustakaanModel = require("../models/perpustakaan");
const fs = require("fs");

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
    await PerpustakaanModel.createNewPerpustakaan({
      ...body,
      berkas: req.file.filename,
    });

    res.json({
      message: "CREATE new data Perpustakaan success",
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

const updatePerpustakaan = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(id);
  try {
    const [data] = await PerpustakaanModel.getPerpustakaanById(id);
    const berkas_lama = data[0].berkas;
    const path = "uploads/" + berkas_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }

      console.log("File deleted successfully.");
    });
    await PerpustakaanModel.updatePerpustakaan({ ...body, berkas: req.file.filename }, id);
    res.json({
      message: "UPDATE data Perpustakaan success",
      data: {
        id: id,
        ...body,
        berkas: req.file.filename,
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

const deletePerpustakaan = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await PerpustakaanModel.getPerpustakaanById(id);
    const berkas_lama = data[0].berkas;
    const path = "uploads/" + berkas_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }
      console.log("File deleted successfully.");
    });
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
