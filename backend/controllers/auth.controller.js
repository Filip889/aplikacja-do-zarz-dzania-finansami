const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email i hasło są wymagane" });
    }

    try{
        const userExists = await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );
      
    if (userExists.rows.length > 0) {
        return res.status(400).json({message:"Użytkownik już istnieje"});
    }    

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
        "INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email ", [email, hashedPassword]
    );

    res.status(201).json(newUser.rows[0]);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: "Błąd serwera"});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const userResult= await pool.query(
            "SELECT * FROM users WHERE email = $1", [email]
        );

        if (userResult.rows.length === 0) {
            return res.status(400).json({message:"Nieprawidłowe dane"}); 
        }

        const user= userResult.rows[0];

        const isMatch = await bcrypt.compare(password, user.password_hash);
        if(!isMatch){
            return res.status(400).json({message:"Nieprawidłowe dane"});
        }

        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );

        res.json({token});
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:"Błąd serwera"})
    }
};

