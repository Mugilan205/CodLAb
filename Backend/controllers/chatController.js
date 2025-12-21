
import Chat from "../models/chatModel.js" 

export const accessChat = async (req, res) => {
    console.log(req.body);
    const { userId } = req.body;

    // to be an 1 on 1 the groupchat should be false 
    if (!userId) {
        console.log('no user ID');
        return res.status(400);
    }

   const isChat = await Chat.findOne({
  isGroupChat: false,
  users: { $all: [req.user._id, userId] },
})
.populate("users", "-password")
.populate("latestMessage");

if (isChat) {
  await isChat.populate({ // only adds name and email to the ischats sender details 
    path: "latestMessage.sender",
    select: "name email",
  });
  return res.send(isChat);
}

const chatData = {
  chatName: "sender",
  isGroupChat: false,
  users: [req.user._id, userId],
};

const createdChat = await Chat.create(chatData);

const fullChat = await Chat.findById(createdChat._id)
  .populate("users", "-password");

res.status(200).send(fullChat);

}
