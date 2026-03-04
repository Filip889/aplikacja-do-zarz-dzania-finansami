require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const categoriesRoutes = require("./routes/categories.routes");
const transactionsRoutes = require("./routes/transactions.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/transactions", transactionsRoutes);


app.use((err, req, res, next) => {
    console.error("WYKRYTO BŁĄD SERWERA:");
    console.error(err.stack);
    res.status(500).json({ 
        message: "Wystąpił błąd po stronie serwera", 
        error: err.message 
    });
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Serwer uruchomiony poprawnie!`);
    console.log(`Adres: http://localhost:${PORT}`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.error(`BŁĄD: Port ${PORT} jest już zajęty!`);
    } else {
        console.error("Błąd przy uruchamianiu serwera:", e);
    }
});