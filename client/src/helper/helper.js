import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;


/** Make API Requests */


/** To get username from Token */
export async function getUsername(){
    const token = localStorage.getItem('token')
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwt_decode(token)
    return decode;
}

/** authenticate function */
export async function authenticate(username){
    try {
        return await axios.post('/api/authenticate', { username })
    } catch (error) {
        return { error : "Username doesn't exist...!"}
    }
}

/** get User details */
export async function getUser({ username }){
    try {
        const { data } = await axios.get(`/api/user/${username}`);
        return { data };
    } catch (error) {
        return { error : "Password doesn't Match...!"}
    }
}

/** register user function */
export async function registerUser(credentials){
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, credentials);

        let { username, email } = credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({ username, password }){
    try {
        if(username){
            const { data } = await axios.post('/api/login', { username, password })
            return Promise.resolve({ data });
        }
    } catch (error) {
        return Promise.reject({ error : "Password doesn't Match...!"})
    }
}

/** update user profile function */
export async function updateUser(userData){
    try {
        //get the token
        const token = await localStorage.getItem('token');
        if (!token){
            throw new Error('Token is not found in LocalStorage');
        }
        //decode the token to extract user ID
        const decodedToken = jwt_decode(token);
        const userId = decodedToken.userid;

        if (!userId) {
            // Handle the case where the user ID is missing in the token
            throw new Error('User ID not found in token');
        }

        
        // Make an HTTP PUT request to update the user's profile
        const response = await axios.put(`/api/updateUser?id=${userId}`, userData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

         // Check the response status and handle accordingly
         if (response.status === 200) {
            return response.data; // Successfully updated the profile
        } else {
            throw new Error(`Failed to update profile. Status: ${response.status}`);
        }
        
    } catch (axiosError) {
        if (axiosError.response) {
          // Axios error with a response from the server
          throw new Error(`Failed to update profile. Status: ${axiosError.response.status}`);
        } else if (axiosError.request) {
          // Axios error without a response from the server (e.g., network issue)
          throw new Error('Network error. Could not update profile.');
        } else {
          // Something else went wrong
          throw new Error('An unexpected error occurred while updating profile.');
        }
    }
}

/** generate OTP */
export async function generateOTP(username){
    try {
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});

        // send mail with the OTP
        if(status === 201){
            let { data : { email }} = await getUser({ username });
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        return Promise.reject({ error });
    }
}

/** verify OTP */
export async function verifyOTP({ username, code }){
    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
    } catch (error) {
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}