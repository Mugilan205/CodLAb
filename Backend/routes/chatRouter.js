
import { protect } from "../middlewares/authMiddleware.js";
import { accessChat , fetchChats , createGroupChats} from "../controllers/chatController.js"; 
import express from "express"
const router = express.Router();
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.post("/group", protect, createGroupChats);
// router.post("/groupremove", protect, removefromgroup);
// router.post("/groupadd", protect, addtogroup);

export default router;
