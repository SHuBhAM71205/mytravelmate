const bycrpt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getid = async (req, res, next) => {
    const token = req.header('auth-token');
    
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        if(req.body.userId !== req.userId) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
}

module.exports = getid;