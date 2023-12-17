const LoginModel = require("../models/loginModel");

const getUserLoginById = async (req, res) => {
    const { body } = req;

    try {
        const [data] = await LoginModel.getUserLoginById(body);
        if (data.length === 0) {
            return res.status(404).json({
                message: "Username atau Pasword salah!",
                data: null,
            });
        } else {
            // Simpan informasi pengguna ke dalam sesi
            req.session.userId = data[0].id;
            req.session.username = data.username;

            return res.status(200).json({
                message: "Login Berhasil",
                id: data[0].id,
            });
        }
    } catch (error) {
        res.status(500).json({
        message: "Server Error",
        serverMessage: error,
        });
    }

};

module.exports = { getUserLoginById };
