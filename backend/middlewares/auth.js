const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

/**
 * Middleware to authenticate user requests using JWT tokens.
 * Retrieves token from the Authorization header and verifies its validity.
 * If token is valid, attaches user information to the request object.
 * If token is missing or invalid, returns appropriate error response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
exports.isAuthenticated = async (req, res, next) => {
    // Extract token from Authorization header
    // const token = req.headers.authorization?.split(" ")[1];
    const {token} = req.cookies; // Alternative: Extract token from cookies
    
    // Check if token is missing
    if (!token) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    try {
        // Verify token validity and decode user ID
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        // Fetch user data based on decoded user ID
        req.user = await User.findById(decoded._id);
        // Proceed to next middleware
        next();
    } catch (error) {
        // Handle invalid token
        return res.status(403).json({
            success: false,
            message: 'Invalid token'
        });
    }
}
