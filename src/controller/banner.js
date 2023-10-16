const BannerModel = require("../models/banner");

const getAllBanner = async (req, res) => {
  try {
    const [data] = await BannerModel.getAllBanner();

    res.json({
      message: "GET data Banner success",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewBanner = async (req, res) => {
  const { body } = req;
  try {
    await BannerModel.createNewBanner(body);
    res.json({
      message: "CREATE new data Banner success",
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const updateBanner = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    await BannerModel.updateBanner(body, id);
    res.json({
      message: "UPDATE data Banner success",
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

const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    await BannerModel.deleteBanner(id);
    res.json({
      message: "DELETE Banner success",
      data: null,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};
module.exports = { getAllBanner, createNewBanner, updateBanner, deleteBanner };
