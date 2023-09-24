import toast from "react-hot-toast"
import { authenticate } from "./helper";
/* validate login page username*/ 

export async function usernameValidate(values){
    const errors =usernameVerify({},values);

    if(values.username){
        //check user exist or not
        const {status} =await authenticate(values.username)

        if(status!==200){
            errors.exist=toast.error('user does not exist')
        }
    }
    return errors;
}

/*Validate password */
export async function passwordValidate(values){
    const error=passwordVerify({}, values);

    return error;
}

/* validate password*/
 function passwordVerify(error={},values){

    const specialChars =/[!@#$%^&*()_+{}[\]:;<>,.?~\\-]/;

    if(!values.password){
        error.password =toast.error("Password Required...!");
    }else if(!/^[a-z A-Z 0-9_]+$/.test(values.username)){
        error.password=toast.error("Wrong passowrd...!");
    }else if(values.password.length<4){
        error.password=toast.error("Password must be 4 characters long...!");
    }else if(!specialChars.test(values.password)){
        error.password=toast.error("Password must have special characters...!");
    }
    return error
 }
/** Validate reset password */
export async function resetPasswordValidation(values){
    const error=passwordVerify({}, values);

    if(values.password!==values.confirm_pwd){
        error.exist =toast.error("Passwords not match...!");
    }
    return error
}

/** Validate register form */
export async function registerValidation(values){
    const errors =usernameVerify({},values);
    passwordVerify(errors,values);
    emailVerify(errors,values);

    return errors;
}

/** Validate profile page */
export async function profileValidation(values){
    const errors=emailVerify({},values);
    return errors;
}

/*Validate username */
function usernameVerify(error ={},values){
    if(!values.username){
        error.username=toast.error('Username Required...!');
    }else if (!/^[a-z A-Z 0-9_]+$/.test(values.username)){
        error.username=toast.error('Invalid Username...!')
    }
    return error;
}
/** validate email */
function emailVerify(error={},values){
    if(!values.email){
        error.email=toast.error("Email Required...!");
    }else if(values.email.includes(" ")){
        error.email=toast.error("Wrong Email...!")
    }else if(!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i.test(values.email)){
        error.email=toast.error("Invalid email addrss...!")
    }
    return error;
}