
import { protect } from "../middlewares/authMiddleware.js";
import { accessChat } from "../controllers/chatController.js"; 
import express from "express"
const router = express.Router();
router.route("/oto").post(protect, accessChat);
//.get(protect, fetchChats);
// router.post("/group", protect, createGroupChats);
// router.post("/groupremove", protect, removefromgroup);
// router.post("/groupadd", protect, addtogroup);

export default router;
