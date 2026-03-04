const express = require("express");
const router = express.Router();

const authMiddleware=require("../middleware/auth.middleware");
const categoriesController=require("../controllers/categories.controller");

router.post("/", authMiddleware, categoriesController.createCategory);
router.get("/", authMiddleware, categoriesController.getCategories);
router.put("/:id", authMiddleware, categoriesController.updateCategory);
router.delete("/:id", authMiddleware, categoriesController.deleteCategory);

module.exports=router;