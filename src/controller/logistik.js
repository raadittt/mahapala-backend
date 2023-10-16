const LogistikModel = require("../models/logistik");

const getAllLogistik = async (req, res) => {
  try {
    const [data] = await LogistikModel.getAllLogistik();

    res.json({
      message: "GET data Logistik success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewLogistik = async (req, res) => {
  const { body } = req;
  try {
    await LogistikModel.createNewLogistik(body);
    res.json({
      message: "CREATE new data Logistik success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateLogistik = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await LogistikModel.updateLogistik(body, id);
    res.json({
      message: "UPDATE data Logistik success",
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

const deleteLogistik = async (req, res) => {
  const { id } = req.params;
  try {
    await LogistikModel.deleteLogistik(id);
    res.json({
      message: "DELETE Logistik success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
module.exports = { getAllLogistik, createNewLogistik, updateLogistik, deleteLogistik };
