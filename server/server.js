import express from "express";
import cors from 'cors';
import morgan from "morgan";
import connect from "./database/conn.js";
import { localVariables } from "./middleware/auth.js";
import router from './router/route.js';
import userRouter from "./router/product-routes.js";

//const userRouter =require('./router/product-routes.js')
const app=express();

/**middlewares */

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}));
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'));
app.disable('x-powered-by');

const port = 8080;

/**HTTP GET request */
app.get('/',(req,res)=>{
    res.status(201).json("Home GET request");
});
/**api routes */
app.use('/api',router)
app.use('/products',userRouter)

app.use(localVariables)


/** Start server only when valid connection */

connect().then(()=>{
    try{  
 app.listen(port,()=>{
    console.log(`server connected to http://localhost:${port}`);
 })
    }catch(error){
        console.log('cannot connect to the server')
    }
}).catch(error=>{
    console.log('Invalid database connection')
})





