import  mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    password:{
        type:String,
        require:true,
       
    },
    avatar:{
        type:String,
        default:"https://th.bing.com/th?id=OIP.XnpM4kcShhqe-aPu7rvF5wHaF3&w=280&h=222&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2"
    },
},{timestamps:true}
)
const User =mongoose.model('User',userSchema);
export default User;