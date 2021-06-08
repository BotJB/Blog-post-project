// Full Documentation - https://docs.turbo360.co
const vertex = require('vertex360')({ site_id: process.env.TURBO_APP_ID })
const express = require('express')
const methodoverride=require('method-override')
const ejs=require('ejs')
const Article=require('./models/article')
const mongoose=require('mongoose')
mongoose.connect('mongodb://localhost/blogPost',{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true  })
.then(()=>{
  console.log('connected to the database');
}).catch((e)=>{
  console.log(e);
})




const app = express() // initialize app
app.use(express.urlencoded({extended:false}))
app.get(methodoverride('_method'))
const mainRoutes=require('./routes/main')

// app.set('views', './views');
app.set('view engine', 'ejs');


/*  Apps are configured with settings as shown in the conig object below.
    Options include setting views directory, static assets directory,
    and database settings. Default config settings can be seen here:
    https://docs.turbo360.co */

// const config = {
//   views: 'views', // Set views directory
//   static: 'public', // Set static assets directory
//   logging: true,

//   /*  To use the Turbo 360 CMS, from the terminal run
//       $ turbo extend cms
//       then uncomment line 21 below: */

//   // db: vertex.nedb()
// }

// vertex.configureApp(app, config)

app.get('/',async(req,res)=>{
  const articles=await Article.find()

  res.render('articles/index',{articles:articles});
})
app.use('/articles/',mainRoutes)
app.listen(5000,()=>{
  console.log('server is running on 5000 port');
})

module.exports = app
