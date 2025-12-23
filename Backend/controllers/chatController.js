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
  try {
    const { users, name } = req.body;

    if (!users || !name) {
      return res.status(400).send("Please provide all required fields");
    }

    if (users.length < 2) {
      return res
        .status(400)
        .send("Group chat should contain at least 3 members");
    }

    // remove duplicates & add admin
    const usersList = [...new Set([...users, req.user._id])];


    const groupChat = await Chat.create({
      chatName: name,
      users: usersList,
      isGroupChat: true,
      groupAdmin: req.user._id,
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(fullGroupChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const renamegroup = async (req, res)=>{
  const { groupId, newName } = req.body;
  try {
    const updated = await Chat.findOneAndUpdate(
  { _id: groupId },
  { $set: { name : newName } },
  { new: true }
    );
    res.status(200).send("Updated sucessfully");
  }
  catch (err) {
    return res.status(400).send(err.message);
  }
};
export const renameGroup = async (req, res) => {
  const { groupId, newName } = req.body;

  if (!groupId || !newName) {
    return res
      .status(400)
      .json({ message: "groupId and newName are required" });
  }

  try {
    const updatedChat = await Chat.findOneAndUpdate(
      { _id: groupId },
      { $set: { chatName: newName } }, 
      { new: true, runValidators: true }
    );

    if (!updatedChat) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json(updatedChat);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const removeFromGroup = async (req, res) => {
  const { groupId, usersList } = req.body;

  if (!groupId || !usersList || !Array.isArray(usersList)) {
    return res.status(400).send("groupId and usersList are required");
  }

  try {
    const chat = await Chat.findById(groupId);
    if (!chat) return res.status(404).send("Group not found");

    // Remove nulls in chat.users first
    const safeUsers = chat.users.filter((u) => u != null);

    // Convert usersList to strings and create a Set
    const removeSet = new Set(usersList.map((id) => id.toString()));

    // Filter users safely
    chat.users = safeUsers.filter((u) => {
      // u can be ObjectId or object
      const id = typeof u === "object" ? u._id : u;
      return !removeSet.has(id.toString());
    });

    await chat.save();

    const updatedChat = await Chat.findById(groupId)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

export const addToGroup = async (req, res) => {
  const { groupId, usersList } = req.body;

  if (!groupId || !usersList || !Array.isArray(usersList)) {
    return res.status(400).send("groupId and usersList are required");
  }

  try {
    const chat = await Chat.findById(groupId);
    if (!chat) return res.status(404).send("Group not found");

    const existingUsers = new Set(
      chat.users
        .filter((u) => u != null)
        .map((u) => (typeof u === "object" ? u._id.toString() : u.toString()))
    );

    usersList.forEach((userId) => {
      if (!existingUsers.has(userId.toString())) {
        chat.users.push(userId);
      }
    });

    await chat.save();

    const updatedChat = await Chat.findById(groupId)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(400).send(err.message);
  }
};

