const {Router}=require('express');
const router =Router()
const bcrypt = require('bcrypt')

router.get('/',(req,res)=>{
	res.render('index')
})


module.exports=router
