require("dotenv").config();
const PORT = process.env.PORT || 5000;
const express = require("express");
const app = express();
const usersRoute = require("./routes/users.js");
const LogistikRoute = require("./routes/logistik.js");
const DivisiRoute = require("./routes/divisi.js");
const BeritaRoute = require("./routes/berita.js");
const BannerRoute = require("./routes/banner.js");
const KategoriRoute = require("./routes/kategori.js");
const DokumentasiRoute = require("./routes/dokumentasi.js");

const middleware = require("./middleware/log.js");

app.use(middleware);
app.use(express.json());

app.use("/users", usersRoute);
app.use("/logistik", LogistikRoute);
app.use("/divisi", DivisiRoute);
app.use("/berita", BeritaRoute);
app.use("/banner", BannerRoute);
app.use("/kategori", KategoriRoute);
app.use("/kategori", DokumentasiRoute);

app.listen(PORT, () => {
  console.log(`Server berhasil running pada port ${PORT}`);
});
