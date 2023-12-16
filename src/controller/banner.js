const BannerModel = require("../models/banner");
const fs = require("fs");

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

const getBannerById = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await BannerModel.getBannerById(id);
    if (data.length === 0) {
      return res.status(404).json({
        message: "Banner not found",
        data: null,
      });
    }
    res.json({
      message: "GET Banner data by ID success",
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
  console.log(req.file);
  const { body } = req;
  try {
    await BannerModel.createNewBanner({
      ...body,
      gambar: req.file.filename,
    });

    res.json({
      message: "CREATE new data Banner success",
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

const updateBanner = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  console.log(id);
  try {
    const [data] = await BannerModel.getBannerById(id);
    const gambar_lama = data[0].gambar;
    const path = "uploads/" + gambar_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }

      console.log("File deleted successfully.");
    });
    await BannerModel.updateBanner({ ...body, gambar: req.file.filename }, id);
    res.json({
      message: "UPDATE data Banner success",
      data: {
        id: id,
        ...body,
        gambar: req.file.filename,
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

const deleteBanner = async (req, res) => {
  const { id } = req.params;
  try {
    const [data] = await BannerModelModel.getBannerById(id);
    const gambar_lama = data[0].gambar;
    const path = "uploads/" + gambar_lama;
    fs.unlink(path, (err) => {
      if (err) {
        console.error(`Error deleting file: ${err.message}`);
        return;
      }
      console.log("File deleted successfully.");
    });
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

module.exports = { getAllBanner, getBannerById, createNewBanner, updateBanner, deleteBanner };
