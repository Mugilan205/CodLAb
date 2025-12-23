import Chat from "../models/chatModel.js" 
import User from "../models/userschema.js";
//fetch for both 1 to 1 and grp as well 
// 
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
  await isChat.populate({  // only adds name and email to the ischats sender details 
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

export const fetchChats = async (req, res) => {
  try {
    // console.log(req.user.id);
    const chats = await Chat.find({
      users: { $elemMatch: { $eq: req.user.id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    // console.log(chats);
    // populate sender inside latestMessage
    const populatedChats = await User.populate(chats, {
      path: "latestMessage.sender",
      select: "name email",
    });

    res.status(200).json(populatedChats);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const createGroupChats = async (req, res) => {
  if (!req.body.users || !req.body.name) 
    {
      return res.status(400).send("Enter All Feilds");
  }
    const users = req.user.users;
    users.push(req.user);
    if (users.size() < 2) {
      return res.status(400).send("Group Should Contain more than 2 members");
  }
  const newGroup = {
    chatName: req.user.name,
    users: users,
    isGroupChat: true,
    groupAdmin :req.user, 
  }
  
    try {
      const groupchat = Chat.create(newGroup);
      const fullGroupChat = Chat.findOne({ _id: newGroup._id })
      .populate("users", "-password").populate("groupAdmin", "-password");
      res.status(200).send(fullGroupChat);
  }
    catch (err) {
      res.status(400).send(err.message);
  }
  
}
