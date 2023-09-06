import Articles from "../models/ArticleModels.js";
import db from "../config/connection.js";

// GET all articles
export const getArticles = async(req,res) => {
    try {
        const queryResult = await db.query('SELECT * FROM articles ORDER BY id ASC');
        res.json(queryResult[0]);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// GET articles by ID
export const getArticleById = async (req, res) => {
    const articleId = req.params.id; // Retrieve the user ID from the request parameters

    try {
        const article = await Articles.findOne({
            where: {
                id: articleId
            }
        });

        if (!article) {
            // If the user with the specified ID is not found, return a 404 status code
            return res.status(404).json({ msg: "Article not found" });
        }

        // If the user is found, return the user data as JSON
        res.json(article);
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// POST create new article
export const createArticle = async (req, res) => {
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
    // Proses penyimpanan artikel dengan judul, deskripsi, dan req.file (foto)
    await Articles.create({
      judul: judul,
      deskripsi: deskripsi,
      foto: fotopath, // Simpan path file jika ada, atau null jika tidak ada foto
    });

    res.status(201).json({ msg: "Artikel berhasil dibuat" });
  } catch (error) {
    res.status(400).json({ error: "kosong" });
  }
};



// PUT update article
export const updateArticle = async(req,res) => {
    const article = await Articles.findOne({
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
        await Articles.update({
        judul: judul,
        deskripsi: deskripsi,
        foto: fotopath, // Simpan path file jika ada, atau null jika tidak ada foto
        },{
            where:{
                id: article.id
            }
        });

        res.status(200).json({ msg: "Artikel berhasil diperbarui"});
    } catch (error) {
        res.status(400).json({ error: "Gagal memperbarui artikel" });
    }
}

// DELETE article
export const deleteArticle = async(req,res) => {
    const article = await Articles.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!article) return res.status(404).json({msg: "Artikel tidak ditemukan"});
    try {
        await Articles.destroy({
            where:{
                id: article.id
            }
        });
        res.status(200).json({msg: "Artikel berhasil dihapus"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}
