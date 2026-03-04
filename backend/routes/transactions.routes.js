const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const transactionsController = require("../controllers/transactions.controller");

router.get("/", authMiddleware, transactionsController.getTransactions);
router.post("/", authMiddleware, transactionsController.createTransaction);
router.get("/stats", authMiddleware, transactionsController.getStats);



module.exports = router;
