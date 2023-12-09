const express = require("express");
const router = express.Router();

// Import Database
var connection = require("../library/database");

// Get Data Table
router.get("/", function (req, res, next) {
  connection.query(
    `SELECT * FROM kelas11 ORDER BY id desc`,

    function (err, rows) {
      if (err) {
        req.flash("error", err);
        res.render("siswa", {
          data: "",
        });
      } else {
        res.render("siswa/index", {
          data: rows,
        });
      }
    }
  );
});

// Create Data Siswa
router.get("/create", function (req, res, next) {
  res.render("siswa/create", {
    nama_siswa: "",
    alamat: "",
    telepon: "",
  });
});

// Store Data Siswa
router.post("/store", function (req, res, next) {
  let namaSiswa = req.body.nama_siswa;
  let alamat = req.body.alamat;
  let telepon = req.body.telepon;

  let errors = false;

  if (namaSiswa.length === 0 || alamat.length === 0 || telepon.length === 0) {
    errors = true;

    req.flash("error", "Silahkan Isi Data Siswa Dengan Benar");

    res.render("siswa/create", {
      nama_siswa: namaSiswa,
      alamat: alamat,
      telepon: telepon,
    });
  }

  // Push Data
  if (!errors) {
    let formData = {
      nama_siswa: namaSiswa,
      alamat: alamat,
      telepon: telepon,
    };

    connection.query("INSERT INTO kelas11 SET ?", formData, function (err) {
      if (err) {
        req.flash("error", err);

        res.render("siswa/create", {
          nama_siswa: namaSiswa,
          alamat: alamat,
          telepon: telepon,
        });
      } else {
        req.flash("success", "Data Siswa Berhasil Disimpan!");
        res.redirect("/siswa");
      }
    });
  }
});

module.exports = router;
