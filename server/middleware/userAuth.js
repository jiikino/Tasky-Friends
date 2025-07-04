import jwt from "jsonwebtoken";


const userAuth = async (req, res, next) => {
    const token = req.cookies.token; // get the token from the cookies
    
    if (!token) {
        return res.json({success: false, message: 'Not authorized, token is missing'});
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if(tokenDecode.userId) {
            req.userId = tokenDecode.userId;
        } else {
            return res.json({success: false, message: 'Not authorized, Login Again!'});
        }

        next();
    } catch (error) {
        return res.json({success: false, message: 'Invalid token'});
    }
}


export default userAuth;