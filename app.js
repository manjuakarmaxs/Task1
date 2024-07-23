const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
app.use(express.json(bodyParser));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



const loginController = require('./Controller/loginController');

app.post('/login', loginController.userLogin);
app.post('/register', loginController.userRegister);
app.get('/viewUser',loginController.viewUser);




app.listen(port, () => {
    console.log(`server running on port ${port}`);
});


