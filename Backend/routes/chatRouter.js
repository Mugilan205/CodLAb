
import { protect } from "../middlewares/authMiddleware.js";
import { accessChat , fetchChats , createGroupChats , renameGroup , removeFromGroup , addToGroup} from "../controllers/chatController.js"; 
import express from "express"
const router = express.Router();
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.post("/group", protect, createGroupChats);
router.put("/renamegroup", protect, renameGroup);
router.patch("/groupremove", protect, removeFromGroup);
router.post("/groupadd", protect, addToGroup);

export default router;
