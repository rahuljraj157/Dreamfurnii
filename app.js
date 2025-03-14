
require("dotenv").config()
// ------------------DB connection
const mongoose=require("mongoose")
// mongoose.connect("mongodb://127.0.0.1:27017/project_1")
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// ------------------requiring
const express=require("express")
const app=express()
const userRoutes=require("./routes/userRoutes")
const adminRoutes=require("./routes/adminRoutes")

// -----------view engine setting
app.use(express.static('asset'))  // -----css setting
app.set("view engine","ejs")

// -----middleware
app.use("/",userRoutes)
app.use("/admin",adminRoutes)

// ---------------port nummber
// app.listen(process.env.PORT,()=>{

//     console.log("server is running on 3007");
// })
const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

