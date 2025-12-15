const mongoose = require("mongoose"); 
const qnPost = mongoose.SchemaType({
    title: {
        type: String, 
        default : "no title "
    }
    ,
    description: {
        type: String, 
        required: [true, 'description is required !'] ,
        trim : true ,
    },
    usedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true ,
    }
}, { timestamps: true }
)

