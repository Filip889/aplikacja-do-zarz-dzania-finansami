const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

router.get("/me", authMiddleware, userController.getMe);
router.put("/email", authMiddleware, userController.changeEmail);
router.put("/password", authMiddleware, userController.changePassword);
router.delete("/", authMiddleware, userController.deleteAccount);

module.exports = router;