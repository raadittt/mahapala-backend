const express = require('express');
const router = express.Router();

const database = require('../config/db.js');

router.get('/', function (req, res, _next) {
  res.render('index', { title: 'Express', session: req.session });
});

router.post('/', async function (request, response, next) {
    const username = request.body.username;
    const password = request.body.password;
  
    if (username && password) {
        const query = 'SELECT id, username, password FROM user_login WHERE username = ?';
        database.query(query, [username], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        console.log('Query results:', results);
        });
  
      try {
        const data = await database.query(query, [username]);
  
        if (data.length > 0) {
          // Jika pengguna dengan username yang diberikan ditemukan
          let passwordMatch = false;
  
          for (let count = 0; count < data.length; count++) {
            console.log('DB Password:', data[count].password);
            console.log('Entered Password:', password);
          
            if (data[count].password === password) {
              passwordMatch = true;
              request.session.id = data[count].id;
              break;
            }
          }
  
          if (passwordMatch) {
            response.redirect("/");
          } else {
            response.send('Password Salah');
          }
        } else {
          // Jika pengguna dengan username yang diberikan tidak ditemukan
          response.send('Username Salah');
        }
      } catch (error) {
        console.error(error);
        response.send('Terjadi kesalahan');
      } finally {
        response.end();
      }
    } else {
      response.send('Silakan Masukkan Alamat Email dan Kata Sandi');
      response.end();
    }
  });
  
  

router.get('/logout', function (request, response, _next) {
  request.session.destroy();
  response.send("Logout berhasil");
});

module.exports = router;




// const express = require("express");
// const router = express.Router();
// const userController = require("../controller/userController");

// router.post("/login", userController.login);
// router.get("/dashboard", userController.dashboard);

// module.exports = router;
