const DokumentasiModel = require("../models/dokumentasi");

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

const createNewDokumentasi = async (req, res) => {
  const { body } = req;
  try {
    await DokumentasiModel.createNewDokumentasi(body);
    res.json({
      message: "CREATE new data Dokumentasi success",
      data: body,
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
  try {
    await DokumentasiModel.updateDokumentasi(body, id);
    res.json({
      message: "UPDATE data Dokumentasi success",
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

const deleteDokumentasi = async (req, res) => {
  const { id } = req.params;
  try {
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
module.exports = { getAllDokumentasi, createNewDokumentasi, updateDokumentasi, deleteDokumentasi };
