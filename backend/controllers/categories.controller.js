const pool=require("../db");


exports.createCategory = async (req, res) => {
    const { name, type } = req.body;
    const userId = req.user.id;

    if(!name || !type){
        return res.status(400).json({message: "Nazwa i typ są wymagane"});
    }

    if(!["income", "expense"].includes(type)){
        return res.status(400).json({message: "Nieprawidłowy typ kategorii"});
    }

    try{
        const result = await pool.query(
        "INSERT INTO categories (name, type, user_id) VALUES ($1, $2, $3) RETURNING *",
        [name, type,  userId]
        );

        res.status(201).json(result.rows[0]);
    }
    catch (err){
        console.error(err);
        res.status(500).json({message:"Błąd serwera"});
    }
};


exports.getCategories = async (req, res) => {
    const userId = req.user.id;

    try{
        const result = await pool.query(
            "SELECT * FROM categories WHERE user_id = $1",
            [userId]
        );
        res.json(result.rows);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Błąd serwera"});
    }
};


exports.updateCategory = async (req, res) => {
    const { name , type } = req.body;
    const categoryId = req.params.id;
    const userId = req.user.id;

    if(!name || !type){
        return res.status(400).json({message:"Nazwa i typ są wymagane"});
    }

    try{
        const result=await pool.query(
            `UPDATE categories
            SET name = $1, type = $2
            WHERE id= $3 AND user_id=$4
            RETURNING *`,
            [name, type, categoryId,userId]
        );

        if(result.rows.length === 0){
            return res.status(404).json({message:"Nie znaleziono kategorii"});
        }
        res.json(result.rows[0]);
    }
    catch (err){
        console.error(err);
        res.status(500).json({message:"Błąd serwera"});
    }
};


exports.deleteCategory = async (req, res) => {
    const categoryId=req.params.id;
    const userId=req.user.id;

    try{
        const result=await pool.query(
            "DELETE FROM categories WHERE id=$1 AND user_id = $2",
            [categoryId, userId]
        );

        if(result.rowCount===0){
            return res.status(404).json({message:"Nie znaleziono kategorii"});
        }
        res.json({message: "Kategoria usunięta"});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Błąd serwera"});
    }
};
