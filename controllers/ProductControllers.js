import Products from "../models/ProductModels.js";
import db from "../config/connection.js";

// GET all product
export const getProducts = async(req,res) => {
    try {
        const queryResult = await db.query('SELECT * FROM products ORDER BY id ASC');
        res.json(queryResult[0]);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// GET products by ID
export const getProductById = async (req, res) => {
    const productId = req.params.id; // Retrieve the user ID from the request parameters

    try {
        const product = await Products.findOne({
            where: {
                id: productId
            }
        });

        if (!product) {
            // If the user with the specified ID is not found, return a 404 status code
            return res.status(404).json({ msg: "Product not found" });
        }

        // If the user is found, return the user data as JSON
        res.json(product);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// POST create new products
export const createProduct = async (req, res) => {
    const judul = req.body.judul;
    const deskripsi = req.body.deskripsi;
    let fotopath = null;
    
    console.log("judul", judul);
    console.log("deskripsi", deskripsi);
    if (req.file) {
      fotopath = `images/${req.file.filename}`;
      console.log("foto", fotopath);
    }
  try { 
    // Proses penyimpanan produk dengan judul, deskripsi, dan req.file (foto)
    await Products.create({
      judul: judul,
      deskripsi: deskripsi,
      foto: fotopath, // Simpan path file jika ada, atau null jika tidak ada foto
    });

    res.status(201).json({ msg: "Produk berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ error: "kosong" });
  }
};



// PUT update product
export const updateProduct = async(req,res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    const judul = req.body.judul;
    const deskripsi = req.body.deskripsi;
    let fotopath = null;

    console.log("judul", judul);
    console.log("deskripsi", deskripsi);

    if (req.file) {
        fotopath = `images/${req.file.filename}`;
        console.log("foto", fotopath);
    }

    try {
        await Products.update({
        judul: judul,
        deskripsi: deskripsi,
        foto: fotopath, // Simpan path file jika ada, atau null jika tidak ada foto
        },{
            where:{
                id: product.id
            }
        });

        res.status(200).json({ msg: "Produk berhasil diperbarui"});
    } catch (error) {
        res.status(400).json({ error: "Gagal memperbarui produk" });
    }
}

// DELETE products
export const deleteProduct = async(req,res) => {
    const product = await Products.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "Produk tidak ditemukan"});
    try {
        await Products.destroy({
            where:{
                id: product.id
            }
        });
        res.status(200).json({msg: "Produk berhasil dihapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
