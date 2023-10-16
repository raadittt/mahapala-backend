const PerpustakaanModel = require("../models/perpustakaan");

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

const createNewPerpustakaan = async (req, res) => {
  const { body } = req;
  try {
    await PerpustakaanModel.createNewPerpustakaan(body);
    res.json({
      message: "CREATE new data Perpustakaan success",
      data: body,
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
  try {
    await PerpustakaanModel.updatePerpustakaan(body, id);
    res.json({
      message: "UPDATE data Perpustakaan success",
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

const deletePerpustakaan = async (req, res) => {
  const { id } = req.params;
  try {
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
module.exports = { getAllPerpustakaan, createNewPerpustakaan, updatePerpustakaan, deletePerpustakaan };
