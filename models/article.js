const mongoose=require('mongoose')
const slugify = require('slugify')

const articleSchema=new mongoose.Schema({
    
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        requried:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    slug:{
        type:String,
        required:true,
        unique:true
    }

})
articleSchema.pre('validate',function(){
  if(this.title){
      this.slug=slugify(this.title,{lower:true,strict:true})
  }  
})
module.exports=mongoose.model('Article',articleSchema)