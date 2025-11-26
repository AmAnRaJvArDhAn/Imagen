import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    try {
        // get token from cookie first, then from Authorization header
        let token = req.cookies.token;
        
        if (!token) {
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7);
            }
        }
        
        if (!token) {
            console.log("❌ No auth token found (header or cookie)");
            return res.status(401).json({ message: "Unauthorized" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log("Error in auth middleware:", error);
        res.status(500).json({ message: "Server error" });
    }
}