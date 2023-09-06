import jwt from "jsonwebtoken";

export const verifyToken = async (req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.username = decoded.username;
        next();
    });
}

export const adminOnly = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token==null) return res.sendStatus(401);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        req.role = decoded.role;
        if (decoded.role !== 'admin') {
            return res.status(403).json({ msg: 'Akses terlarang' });
        }
    next();
    });
};
