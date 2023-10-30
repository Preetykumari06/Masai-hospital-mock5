const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    Email: {type:String,required:true},
    Password: {type:String,required:true}
});

const UserModel=mongoose.model('user', UserSchema);

module.exports={
    UserModel
}