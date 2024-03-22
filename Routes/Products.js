const express = require("express");
const con = require("../config");
const router = express.Router();

router.get("/", (req, resp) => {
  const sql = "select * from  products";

  con.query(sql, (err, data) => {
    if (err) {
      resp.status(500).json({ message: "Product Not Found" });
    } else {
      resp.send(data);
    }
  });
});




router.get("/:page", (req, res) => {
  const { page } = req.params;
  const limit = 10;
  const offset = (page - 1) * limit;

  const sql = `
      SELECT products.id AS product_id, products.name AS product_name,
             category.id AS category_id, category.name AS category_name
      FROM products
      INNER JOIN category ON products.category_id = category.id
      LIMIT ?, ?
    `;

  con.query(sql, [offset, limit], (err, results) => {
    if (err) {
      res.status(500).json({ message: err.message });
    } else {
      const totalCountSql = "SELECT COUNT(*) AS total FROM products";
      con.query(totalCountSql, (err, result) => {
        if (err) {
          res
            .status(500)
            .json({ message: "Error occurred while counting products" });
        } else {
          const totalCount = result[0].total;
          const totalPages = Math.ceil(totalCount / limit);

          res.json({
            total_count: totalCount,
            total_pages: totalPages,
            data: results,
          });
        }
      });
    }
  });
});

router.post("/", (req, resp) => {
    const { name, price, category_id } = req.body;
    const sql = "INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)";
    con.query(sql, [name, price, category_id], (err, result) => {
        if (err) {
            resp.status(500).json({ message: "Failed to add new Product" }); 
        } else {
            resp.status(201).json({ message: "Product added successfully!" });
        }
    });
});

router.put('/:productId', (req,resp) => {
    const productId = req.params.productId;
   const { name, price, category_id} = req.body;
   const sql="UPDATE products SET name=?, price=?, category_id=? WHERE id=?";
    con.query(sql, [name,price,category_id,productId], function(err, result) {
        if (err) {
             resp.status(500).json({message:"Failed to Update Product"});
        }else{
            resp.status(200).json({message:'Update Success'});
        }
    });
});

router.delete("/:id", (req,resp)=>{
    const {id}=req.params;
    const sql="DELETE FROM products WHERE id=?";
    con.query(sql,id,(err,result)=>{
        if(err){
            resp.status(500).json({message:"Product delete failed"});
        }else{
           resp.status(200).json({message:"Product delete Sucessful"});   
        }
    })
})

module.exports = router;
