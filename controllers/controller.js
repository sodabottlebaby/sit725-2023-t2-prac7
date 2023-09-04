let collection = require('../models/cat');

const postCat = (req,res) => {
    let cat = req.body;
    collection.postCat(cat, (err, result) => {
      if (!err) {
          res.json({statusCode: 201, data:result, message:'Cat created successfully!'});
        }
    });
}

const getAllCats = (req,res) => {
    collection.getAllCats((err, result) => {
        if (!err) {
            res.json({statusCode: 200, data:result, message:'get all cats successful'});
        }  
    });
}

const deleteCat = (req,res) => {
    let cat = req.body;
    collection.deleteOne(cat, (err, result) => {
        if (!err) {
            res.json({statusCode: 200, data:result, message:'delete cat successful'});
        }  
    });
}

module.exports = {postCat,getAllCats} 