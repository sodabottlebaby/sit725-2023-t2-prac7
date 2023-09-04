let express = require('express');
let router = express.Router();
let controller = require('../controllers/controller');

router.post('/', function(req,res){
    //ask the controller to perform db logic
    controller.postCat(req,res);
});

router.get('/', (req, res) => {
    controller.getAllCats(req,res);
});

router.delete('/', (req, res) => {
    controller.deleteCat(req,res);
});

module.exports = router;