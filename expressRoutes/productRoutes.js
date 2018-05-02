var express = require('express');
var app = express();
var productRoutes = express.Router();

var productModel = require('../models/product');

bodyparser= require('body-parser');
productRoutes.use(bodyparser.urlencoded({ limit:'5mb' }))
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'dl5dazpus',
    api_key: '125678328268296',
    api_secret: '7R1T7oHtbdG5UKpb_Yrpqg7nsGY'
});


function uploadToCloudinary(path,count,callback){
    cloudinary.v2.uploader.upload(path, function(err,result) {
        if(err){
            callback("",count);
        }
        else{
            callback(result,count);
        }
    })
}

function deleteFromCloudinaryByPublicId(publicid){
    cloudinary.v2.api.delete_resources([publicid],function(error, result){
        if(error){
            console.log(error);
            res.send("Error");
        }
        else{
            console.log(result);
        }
    });
}

productRoutes.route('/add').post(function(req,res){
    try {

        var productdata = new productModel({
            ProductName:req.body.name,
            ProductPrice:req.body.price,
            AddedOn: new Date(),
            ProductServing:req.body.serving,
            ProductDescription:req.body.description,
            ProductImages:[],
            Likes:0,
            Stock:req.body.stock
          });
         
          var count = 0;
          for(var i=0;i<req.body.images.length;i++){
            count++; 
            uploadToCloudinary(req.body.images[i],count,function(response,num){
                productdata.ProductImages.push(response);
                if(num == req.body.images.length){  
                  productdata.save().then(docs => {
                      res.send(docs)
                    })
                    .catch(err => {
                      res.send("Error");
                    })
                }
            }); 
          }

    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})

productRoutes.route('/view').post(function(req,res){
    try {
        productModel.find({},function(err,docs){
            if(err){
              console.log(err);
              res.send("Error");
            }
            else {
              res.send(docs);
            }
          })   
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})

productRoutes.route('/update').post(function(req,res){
    try {
        productModel.findById(req.body._id, function (err,docs) {
            if(err){
                console.log(err);
                res.send("Error");
            }
            else{
                docs.ProductName = req.body.ProductName;
                docs.ProductDescription = req.body.ProductDescription;
                docs.ProductPrice = req.body.ProductPrice;
                docs.ProductServing = req.body.ProductServing;
                docs.Stock = req.body.Stock;

                docs.save(function (err,updatedDoc) {
                    if(err){
                        console.log(err);
                        res.send("Error");
                    }
                    else{
                        res.send(updatedDoc);
                    }
                })
            }
        })
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})

productRoutes.route('/delete').post(function (req,res) {
    try {
        productModel.remove({_id:req.body.id},function(err,docs){
            if(err){
                console.log(err);
                res.send("Error");
            }
            else{
                console.log(docs);
                res.send(docs);
            }
        })
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})


productRoutes.route('/imageupdate').post(function (req,res){
    try {
        deleteFromCloudinaryByPublicId(req.body.publicid);
        var TempArr = [];
        var count = 0;
        for(var i=0;i<req.body.toUpload.length;i++){
          count++; 
          uploadToCloudinary(req.body.toUpload[i],count,function(response,num){
              TempArr.push(response);
              if(num == req.body.toUpload.length){ 
                productModel.findById(req.body.id, function (err,docs) {
                    if(err){
                        console.log(err);
                        res.send("Error");
                    }
                    else{
                        docs.ProductImages = TempArr;
                        docs.save(function (err,updatedDoc) {
                            if(err){
                                console.log(err);
                                res.send("Error");
                            }
                            else{
                                res.send(updatedDoc);
                            }
                        })
                    }
                })
              }
          }); 
        }
    } catch (error) {
        console.log(error);
        res.send("Error");
    }
})

module.exports = productRoutes;
