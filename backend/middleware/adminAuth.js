// middleware/adminAuth.js
import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // Expect Bearer token

        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: 'Not authorized. Please login again' 
            });
        }console.log(token)

        let token_decode;
        try {
            token_decode = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid or expired token' 
            });
        }

        if (token_decode.id !== process.env.ADMIN_EMAIL) {
            return res.status(403).json({ 
                success: false, 
                message: 'Not authorized. Admin access required' 
            });
        }

        req.user = { email: token_decode.id }; // Attach admin email to request
        next();
    } catch (error) {
        console.error('Unexpected error in adminAuth middleware:', error);
        return res.status(500).json({ 
            success: false, 
            message: 'An unexpected error occurred. Please try again later.' 
        });
    }
};

export default adminAuth;