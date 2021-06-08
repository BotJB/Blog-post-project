const express=require('express')
const app=express()
const router=express.Router()
const Article=require('./../models/article')


// router.get('/',(req,res)=>{
//     res.send('this is the artilces page')
// })
app.use(express.urlencoded({extended:false}))

router.get('/new',(req,res)=>{
    res.render('test')
})
router.post('/',async(req,res)=>{
let article=new Article({
  title:req.body.title,
  description:req.body.description,
  markdown:req.body.markdown
})
try{
  article=await article.save()
  res.redirect(`/articles/${article.slug}`)
}
catch(e){
  console.log(e);
  res.render('test',{article:article})
}


    
})
router.get('/:slug',async (req,res)=>{
//  const article=await Article.findById(req.params.id)
//  if(article==null){res.redirect('/')}
//  const id='60bc715f93a67f23d4a2b697'
//  


const article=await Article.findOne({slug:req.params.slug})
res.render('shownew',{article:article})
  

})
router.delete('articles/:id',async(req,res)=>{
await Article.findByIdAndDelete(req.params.id)
res.redirect('/')
})

module.exports=router