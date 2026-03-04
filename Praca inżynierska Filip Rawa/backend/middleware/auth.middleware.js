const jwt = require("jsonwebtoken");

module.exports = (req, res ,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message:"brak tokena"});
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Nieprawidłowy token"});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.userId };
        next();
    }
    catch(err){
        return res.status(401).json({message: "Token nieważny lub wygasł"});
    }
};
