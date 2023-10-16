const DivisiModel = require("../models/divisi");

const getAllDivisi = async (req, res) => {
  try {
    const [data] = await DivisiModel.getAllDivisi();

    res.json({
      message: "GET data Divisi success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewDivisi = async (req, res) => {
  const { body } = req;
  try {
    await DivisiModel.createNewDivisi(body);
    res.json({
      message: "CREATE new data Divisi success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateDivisi = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await DivisiModel.updateDivisi(body, id);
    res.json({
      message: "UPDATE data Divisi success",
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

const deleteDivisi = async (req, res) => {
  const { id } = req.params;
  try {
    await DivisiModel.deleteDivisi(id);
    res.json({
      message: "DELETE Divisi success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
module.exports = { getAllDivisi, createNewDivisi, updateDivisi, deleteDivisi };
