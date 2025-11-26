import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {        // our built-in middleware, we'll use this for protected routes
    try {
        const token = req.cookies.token;      // get the token from the cookie
        if (!token) {                          //checks if token is present or not
            return res.status(401).json({ message: "Unauthorized" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);   //verifying the token
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error);
        res.status(500).json({ message: "Server error" });
    }
}