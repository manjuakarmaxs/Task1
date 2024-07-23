const db = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');




// const crypto = require('crypto');
// const secret = crypto.randomBytes(8).toString('hex');
// console.log(secret);


const dotenv = require('dotenv');
const { request } = require('http');
dotenv.config();


exports.loginUser = async (request, callback) => {
    
    const { EMAIL,UPASSWORD } = request;

    if (!EMAIL || !UPASSWORD) {
        return callback({ error: "EMAIL AND PASSWORD REQUIRED" });
    }
    try {
        const [rows] = await db.execute('SELECT * FROM USER WHERE EMAIL = ?', [EMAIL]);
        // console.log(rows.length)
        if (rows.length === 0) {
            return callback({ error: "User does not exist" });
        }

        const user = rows[0];
        // console.log(user)
        const isPasswordValid = await bcrypt.compare(UPASSWORD, user.UPASSWORD);

        if (!isPasswordValid) {
            return callback({error: "Invalid credentials"});
        }

        const token = jwt.sign({ id: user.UID }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return callback({ message: "Login Success" ,token });

    } catch (error) {
        console.error('Error logging in user:', error.message, error.stack);
        callback({ error: 'Internal server error' });
    }
};

exports.registerUser = async (request, callback) => {
    const { UID,UNAME,EMAIL,UPASSWORD } = request;

    if (!EMAIL || !UPASSWORD) {
        return callback({ error: "EMAIL AND PASSWORD REQUIRED" });
    }
    try {
        const [rows] = await db.execute('SELECT * FROM USER WHERE EMAIL = ?', [EMAIL]);
        if (rows.length > 0) {
            return callback({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(UPASSWORD, 10);
        await db.execute('INSERT INTO USER (UID,UNAME,EMAIL,UPASSWORD) VALUES (?,?,?,?)', [UID,UNAME,EMAIL,hashedPassword]);

        callback(null, { message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error.message, error.stack);
        callback({ error: 'Internal server error' });
    }
};


exports.userView=async(request,callback)=>{
    
    try {
        const [rows] = await db.execute('SELECT * FROM USER ');
        if (rows.length === 0) {
            return callback({ error: "User does not exist" });
        }

        else{
            return callback({rows})
        }
           
    } catch (error) {
        console.error('Error  in FETCHING user:', error.message, error.stack);
        callback({ error: 'Internal server error' });
    }
}


