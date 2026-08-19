

const roleBasedAuth=(req,res,next)=>{
    console.log(req.headers["x-user-role"])
    next()
}


export {roleBasedAuth}