require("dotenv").config();
const PORT = process.env.PORT || 4000;
const express = require("express");
const cors = require('cors');
const corsOptions = require('./config/cors.js');
const app = express();
const session = require("express-session");
const bodyParser = require('body-parser');
const loginRoute = require("./routes/login.js")
const usersRoute = require("./routes/users.js");
const LogistikRoute = require("./routes/logistik.js");
const DivisiRoute = require("./routes/divisi.js");
const BeritaRoute = require("./routes/berita.js");
const BannerRoute = require("./routes/banner.js");
const KategoriRoute = require("./routes/kategori.js");
const DokumentasiRoute = require("./routes/dokumentasi.js");
const PerpustakaanRoute = require("./routes/perpustakaan.js");

const middleware = require("./middleware/log.js");

app.use(middleware);
app.use(express.json());
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
// Gunakan body-parser untuk menangani payload JSON
app.use(bodyParser.json());

// Konfigurasi express-session
app.use(
  session({
    secret: "secret-key", // Gantilah dengan kunci rahasia yang lebih kuat
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Sesuaikan sesuai kebutuhan (contohnya, saat menggunakan HTTPS)
  })
);

app.use("/login", loginRoute)
app.use("/users", usersRoute);
app.use("/logistik", LogistikRoute);
app.use("/divisi", DivisiRoute);
app.use("/berita", BeritaRoute);
app.use("/banner", BannerRoute);
app.use("/kategori", KategoriRoute);
app.use("/dokumentasi", DokumentasiRoute);
app.use("/perpustakaan", PerpustakaanRoute)

app.listen(PORT, () => {
  console.log(`Server berhasil running pada port ${PORT}`);
});
