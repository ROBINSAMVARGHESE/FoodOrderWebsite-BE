const authmiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("Token:", token);
    if (!token) {
        return res.status(401).json("Token not available, not an authorized user");
    }
    jwt.verify(token, process.env.JWT_token, (err, decoded) => {
        if (err) {
            return res.status(403).json("Not an authorized user");
        }
        // If verification succeeds, move to the next middleware
        req.user = decoded;
        next();
    });
};

export default authmiddleware;  // Use default export


