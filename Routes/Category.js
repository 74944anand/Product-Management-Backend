const express = require("express");
const con = require("../config");
const router = express.Router();

router.get("/", (req, resp) => {
  const sql = "select * from  category";

  con.query(sql, (err, data) => {
    if (err) {
      resp.status(500).json({ message: "Category Not Found" });
    } else {
      resp.status(200).send(data);
    }
  });
});

router.get("/:id", (req, resp) => {
  const { id } = req.params;
  const sql = "select * from  category where  id=?";
  con.query(sql, [id], (err, data) => {
    if (err) {
      resp.status(500).json({ message: "Category Not Found" });
    } else {
      resp.status(200).send(data);
    }
  });
});

router.post("/", (req, resp) => {
  const { name } = req.body;
  const sql = "INSERT INTO category (name) VALUES(?)";
  con.query(sql, [name], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to add Category." });
    } else {
      resp.status(201).json({ message: "Category Added" });
    }
  });
});

router.put("/:id", (req, resp) => {
  const { id } = req.params;
  const { name } = req.body;
  const sql = "UPDATE category SET name=? WHERE id=?";
  con.query(sql, [name, id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to update Category." });
    } else {
      resp.status(201).json({ message: "Category updated" });
    }
  });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM category WHERE id=?";
  con.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: "Failed to delete Category." });
    }
    res.status(200).json({ message: "Category Deleted" });
  });
});

module.exports = router;
