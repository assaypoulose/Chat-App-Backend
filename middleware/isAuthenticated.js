import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.id = decoded.userId; // Set the userId from decoded token to req.id
        next();
    } catch (error) {
        console.error("Error in authentication middleware:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default isAuthenticated;
