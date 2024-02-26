const express = require("express");
const cors = require("cors");
const mongoose= require("mongoose")


const app = express();



app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 8080
//Schema

const schemaData = mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
},{
    timestamps: true
})

const userModel = mongoose.model("users",schemaData)
//Read Data
//                     http://localhost:8080/-------GET METHOD
       
app.get("/",async(req,res)=>{
    const data = await userModel.find({})
    res.json({
        message: "server is running",
        success: true,
        data : data,
    })
})

//create  data
                         // localhost:8080/create------POST METHOD

            /*{
                "name": "venkatestt",
                "email": "venkatesh@gmail.com",
                "mobile": "9956688888"
            }    */
app.post("/create",async(req,res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()
    res.send({
        success: true,
        message: "data saved successfully",
        data: data,
    })
})

//Update Data
//                 localhost:8080/update----PUT METHOD

        /* {
            "id": "65c5d9c62413364ddbe0f8fb",
            "email": "vasanth111@gmail.com"
        }*/
app.put("/update", async(req,res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body;
    console.log(rest)
     await userModel.updateOne({_id: _id},rest)
    // await userModel.updateOne({_id: req.body.id},{name: "kkvasanth"})
    res.send({
        success: true,
        message: "updated successfully"
    })
})

// Delete data
//        localhost:8080/delete/65c62f17b0dad9abdf3e5758-------DELATE METHOD
app.delete("/delete/:id",async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const data = await userModel.deleteOne({_id:id})
    res.send({
        success: true,
        message: "data deleted successfully",
        data : data,
    })
})

//Database connection
mongoose.connect("mongodb://127.0.0.1:27017/curdoperation")
.then(()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>console.log("server is started"))
})
.catch((err)=>console.log(err))
