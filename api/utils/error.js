export const errorHandler = (statusCode,message)=>{
    const error =new Error();
    //here we use constructor
    error.statusCode =statusCode;
    error.message =message
//after = this is from paranthesis
return error;
}