import UserModel from '../model/User.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import otpGenerator from 'otp-generator'

/**middleware for verify user */
export async function verifyUser(req, res, next) {
    try {
        const { username } = req.method === "GET" ? req.query : req.body;

        // Check if the user exists
        let user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(401).send({ error: "Authentication failed: User not found" });
        }

        // Attach the user object to the request for further processing if needed
        req.user = user;

        next();
    } catch (error) {
        return res.status(500).send({ error: "Internal Server Error" });
    }
}

/** POST: http://localhost:8080/api/register 
 * @param : {
  "username" : "example123",
  "password" : "admin123",
  "email": "example@gmail.com",
  "firstName" : "bill",
  "lastName": "william",
  "mobile": 8009860560,
  "address" : "Apt. 556, Kulas Light, Gwenborough",
  "profile": ""
}
*/
export async function register(req, res) {
    try {
        const { username, password, profile, email } = req.body;

        // Check for existing username
        const existingUsername = await UserModel.findOne({ username });
        if (existingUsername) {
            return res.status(400).send({ error: "Please use a unique username" });
        }

        // Check for existing email
        const existingEmail = await UserModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).send({ error: "Please use a unique email" });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new UserModel({
                username,
                password: hashedPassword,
                profile: profile || "",
                email,
            });

            // Save the user
            const result = await user.save();
            return res.status(201).send({ msg: "Registered successfully" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error" });
    }
}


/** POST: http://localhost:8080/api/login
 * @param : {
  "username" : "example123",
  "password" : "admin123",
}
*/
export async function login(req,res){

    const {username,password}=req.body;

    try{

        UserModel.findOne({username})
        .then(user=>{
            bcrypt.compare(password, user.password)
                .then(passwordCheck =>{
                    if(!passwordCheck) return res.status(400).send({error:"Dont have password"})

                    //create jwt token
               const token = jwt.sign({
                    userid:user._id,
                    username:user.username
                },ENV.JWT_SECRET,{expiresIn:"24h"});

                return res.status(200).send({
                    msg:"Login successful...",
                    username:user.username,
                    token
                });
                })
            .catch(error =>{
                return res.status(404).send({error:"Password does not match"});
            })
        })
        .catch(error=>{
            return res.status(404).send({error:"Username not found"});
        })

    }catch(error){
        return res.status(500).send({error})
    }
}

/** GET: http://localhost:8080/api/user/example123 */
export async function getUser(req, res) {
    const { username } = req.params;
    try {
        if (!username) {
            return res.status(400).send({ error: "Invalid username" });
        }

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
          /** remove password from user */
            // mongoose return unnecessary data with object so convert it into json
        const {password,...rest}=Object.assign({},user.toJSON())
        return res.status(200).send(rest);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}


/** PUT: http://localhost:8080/api/updateuser
 * @param : {
 "id":"<token>"
 }
 body{
  "firstName" : "",
  "address" : "",
  "profile": ""
}
*/
// Your updateUser route

export async function updateUser(req, res) {
    try {
        const id = req.query.id;
        if (id) {
            const body = req.body;
            console.log
            
            // Use async/await instead of callbacks for better error handling
            const updatedUser = await UserModel.findByIdAndUpdate(id, body, { new: true });

            if (updatedUser) {
                return res.status(200).send({ msg: "Record updated", user: updatedUser });
            } else {
                return res.status(404).send({ error: "User not found" });
            }
        } else {
            return res.status(400).send({ error: "Missing user ID" });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ error: "Internal server error" });
    }
}



   


/** GET: http://localhost:8080/api/generateOTP */
export async function generateOTP(req,res){
    
   req.app.locals.OTP= await otpGenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
    res.status(201).send({code:req.app.locals.OTP})
}


/** GET: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req,res){
    const {code }=req.query;
    if(parseInt(req.app.locals.OTP)===parseInt(code)){
        req.app.locals.OTP=null; //reset OTP value
        req.app.locals.resetSession =true; //start session for reset password
        return res.status(201).send({msg:'Verified Successfully'});
    }
    return res.status(400).send({error:'Invalid OTP'})
}

//successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession =false;
             return res.status(201).send({ flag: req.app.locals.resetSession})
        }
        return res.status(440).send({error : "Session expired!"})
     }


/** reset password */
export async function resetPassword(req, res) {
    try {
        if (!req.app.locals.resetSession) {
            return res.status(440).send({ error: "Session expired!" });
        }

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(404).send({ error: "Username not found" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await UserModel.updateOne({ username: user.username }, { password: hashedPassword });

        req.app.locals.resetSession = false; // reset session

        return res.status(201).send({ msg: "Record Updated...!" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}
