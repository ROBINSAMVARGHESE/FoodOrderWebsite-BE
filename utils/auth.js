import jwt from 'jsonwebtoken';

// Create token for both Admin and User
const createToken = (id, role = 'user') => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '5d' });
};

export default createToken;
