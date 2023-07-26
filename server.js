let express = require('express');
let app = express();
let port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/'));

app.get('/', (req, res)=>{
    res.render('index.html');
});

app.get('/addTwoNumbers', (req, res)=>{
    let num1 = req.query.number1; //this should return 1
    let num2 = req.query.number2; //this should return 2

    //add the two inetegers together
    let sum = parseInt(num1) + parseInt(num2);
    //create an object to send back as response, include: statusCode, message, data
    let obj ={statusCode:200, message: 'success', data: sum};
    //send back the response
    res.json(obj);
});
app.listen(port, ()=>{
    //this is the logic that will be fired upon server start
    console.log('Server started on port: ' + port);
});

