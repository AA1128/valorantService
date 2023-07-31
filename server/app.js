const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User')
const passwordValidator = require('./services/passwordValidationService');



const port = 4000;
app.listen(port, console.log(`server is listening on port ${port}...`));
app.use(express.json());
app.use(cors());

const uri = 'mongodb+srv://eo1:kitty111@cluster0.1l0wuvk.mongodb.net/animalDatabase';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDb');
}).catch((error) => {
    console.error('Error connecting to MongoDB: ' , error);
})

const db = mongoose.connection;




app.get('/users', async (req, res) => {
    try{
        User.find()
            .then((users) =>{
                console.log('All users:', users);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            })
        
        res.send("hi");
       
    }
    catch(error){
        console.error('Error fetching users: ', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
})

app.post('/api/v1/login', async(req, res) => {
    const {email, password} = req.body;

    try{
        const user = await User.findOne( {email} );

        if(user && user.password === password){
            return res.json({message: "login successful"});
        }else{
            return res.status(401).json({error: "Invalid email or password." })
        }
    }catch(err){
        console.error('Error during login', err);
        return res.status(500).json({error: 'Internal Server Error'});
    }
});





app.post('/api/v1/register', async(req, res) => {
    try{
        
        const newUser = new User();

        newUser.firstName = req.body.firstName;
        newUser.lastName = req.body.lastName;
        newUser.email = req.body.email;
        newUser.password = req.body.password;

        if(!passwordValidator(newUser.password)){
            return res.status(400).json( {error: 'Invalid password' });
        }

        User.create(newUser)
            .then((createdUser) =>{
                console.log('New User Created: ', createdUser);
                res.json(req.body);
            })
            .catch((error) =>{
                console.error('Error creating user', error);
                if(error.code === 11000){
                    return res.status(409).json({ error: 'Email is already in use' });
                }
            });

        


    }catch(err){
        console.error(`Error updating data ${err}`);
   



        res.status(500).json({ err: 'Internal Server Error' });
    }
})

