const express= require('express')
const router = express.Router()


const mongoose = require('mongoose')
const User = require('../models/user')
const Product = require ('../models/product')
const Cart = require('../models/cart')


const multer = require('multer')

const storage = multer.diskStorage({
    destination:(req , file , callBack)=>{
        callBack(null,'images')
    },
    filename: (req, file, callBack)=>{
        console.log(file);
        callBack(null, file.originalname)
    }
})

const upload = multer({storage: storage})


const db="mongodb+srv://amineadmin:amineadmin2023@cluster0.uwlzemx.mongodb.net/OnlineShop?retryWrites=true&w=majority"

mongoose.set('strictQuery', false);


mongoose.connect(db, err =>{
    if (err) {
        console.error('Error! '+err)
    }else{
        console.log('Connected to mongodb')
    }
})

router.get('/',(req,res)=>{
    res.send('From API route')
})



router.post('/uploadImage', upload.single('Productimage') , (req , res)=>{
    const image = req.file;
    console.log(image.filename);
    if (image) { 
        res.status(200).send(image)
    }
    else{
        console.log('no file');
    }
})


router.post('/addProduct',(req,res)=>{
    let productData= req.body
    let product= new Product(productData)
    product.save((error, registeredProduct)=>{
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredProduct)
        }
    })
})

router.post('/updateProduct', (req,res)=>{
    let UpdatedProductData= req.body
    Product.findOneAndUpdate({code: UpdatedProductData.code},{name: UpdatedProductData.name , price : UpdatedProductData.price , imageUrl: UpdatedProductData.imageUrl,description: UpdatedProductData.description, category: UpdatedProductData.category},{new : true},(error,upProduct)=>{
        if (error) {
            console.log(error)
        }
        else{
            res.status(200).send(upProduct)
        }
    })
})



router.post('/deleteProduct' , (req,res)=>{
    let DeleteProductData= req.body
   
    Product.findOneAndDelete({code: DeleteProductData.code},(error,delProduct)=>{
        if (error) {
            console.log(error)
        }
        else{
            res.status(200).send(delProduct)
        }
    })
})

router.post('/listOneProduct',(req,res)=>{
    let productData= req.body
    Product.findOne({_id: productData.productCode},(error,oneProduct)=>{
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(oneProduct)
        }
    })
})

router.get('/listProducts',(req , res )=>{
    Product.find({ },(error,products)=>{
        if (error) {
            console.log(error)
        } else {
            res.json(products).status(200)
        }
    })
})


router.post('/listCart',(req , res )=>{
    let cartData = req.body;
    Cart.findOne({userId: cartData._id},(error,cart)=>{
        if (error) {
            console.log(error);
        } else {
            res.status(200).send(cart)
        }
    })
})



router.post('/addToCart',(req,res)=>{
    let cartData = req.body;
    let cart = new Cart(cartData)
    Cart.findOne({userId : cartData.userId},(error , UserCart)=>{

        if (error) {
            console.log(error);
        } else {
            if (UserCart) {
                let found = false
                UserCart.products.forEach(element => {
                    if(element.productCode==cartData.products[0].productCode){
                        found=true
                        element.quantity+=cartData.products[0].quantity
                        Cart.updateOne({userId : cartData.userId},{ $pull : {products :{productCode : element.productCode} } },(error,editedCart)=>{
                            if (error) {
                                console.log(error);
                            } else {
                                console.log(editedCart)
                                Cart.updateOne({userId : cartData.userId},{$push: {products: element}},(error,addedCart)=>{
                                    if (error) {
                                        console.log(error);
                                    } else {
                                        console.log(addedCart);
                                        res.status(200).send(addedCart) 
                                    }
                                })
                            }
                        })
                        
                        return
                    } 
                })
                if (found==false) {
                    Cart.updateOne({userId : cartData.userId},{$push: {products: cartData.products }},(error,addedCard)=>{
                        if (error) {
                            console.log(error);
                        } else {
                            res.status(200).send(addedCard) 
                        }
                    })
                }                    
            }
            else{
                cart.save((error,savedCart)=>{
                    if(error){
                        console.log(error)
                    }
                    else{
                        res.status(200).send(savedCart)
                    }
                })
            }
        }
        
    })
})



router.post('/deleteItemFromCart',(req,res)=>{
    let cartData = req.body
    Cart.updateOne({userId : cartData.userId},{ $pull : {products :{productCode : cartData.ProductId} } },(error,deletedCart)=>{
        if (error) {
            console.log(error)
        } else {
            console.log(cartData._id)
            res.status(200).send(deletedCart)
        }
    })
})



router.post('/register',(req, res)=>{
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser)=>{
        if (error) {
            console.log(error)
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login',(req,res)=>{
    let userData=req.body
    User.findOne({email: userData.email}, (error,user)=>{
        if (error) {
            console.log(error)
        } 
        else {
            if (!user) {
                res.status(401).send('Invalid Email')
            } 
            else {
                if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                }
                else{
                    res.status(200).send(user)
                }
            }
        }
    })
})




module.exports = router;