const {Router}=require('express');
const router =Router()
const bcrypt = require('bcrypt')
const User = require('../models/users')

router.get('/',(req,res)=>{
	res.render('index')
})
router.get('/login',(req,res)=>{
	res.render('login')
})
router.get('/register',(req,res)=>{
	res.render('register')
})
router.get('/logout',(req,res)=>{
	req.session.destroy();
	res.redirect('/')
})

router.post('/register',(req,res)=>{
	if(req.body.password === req.body.passwordConfirm){
		User.findOne({email:req.body.email})
		.then(user=>{
			if(user){
				res.render('register',{msg:"That email is already in use"})
			}
			else{
				return new Promise((resolve,reject)=>{
					bcrypt.hash(req.body.password,13,(err,hash)=>{
					User.create({email:req.body.email,password:hash})
					resolve(hash)
					})
				}).then(res.render('Register', {msg:"User Successfully Registered"}))
			}
		})
	}
})

router.post('/login',(req,res)=>{
	User.findOne({email:req.body.email})
	.then(user=>{
		if(user){
			bcrypt.compare(req.body.password,user.password,(err,matches)=>{
				if(matches){
					req.session.email=req.body.email;
					res.render('login',{msg:"Successfully logged in"})
				}
				else{
					res.render('login',{msg:"Email and password do not match"})
				}
			})
		}
		else{
			res.render('login',{msg:"Account with that email does not exist"})
		}
	})
})

module.exports=router
