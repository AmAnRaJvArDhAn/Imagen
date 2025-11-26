import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    let token;

    // 1) Pehle Authorization header check karo: "Bearer <token>"
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2) Nahi mila to cookies me dhundo (jo tu abhi use kar raha hai)
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      console.log("❌ No auth token found (header or cookie)");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // decoded me tu login ke time jo daal raha tha (jaise { userId: user._id })
    req.user = decoded;

    next();
  } catch (error) {
    console.log("❌ Error in auth middleware:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
