// backend/middleware/isAdmin.middleware.js
const jwt = require('jsonwebtoken');

const isAdmin = async (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Assuming the decoded token has a 'role' field
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(400).json({ message: 'Unauthorized' });
    }
}

module.exports = isAdmin;