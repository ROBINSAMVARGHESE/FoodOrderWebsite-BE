import jwt from 'jsonwebtoken';

const createToken = (adminId) => {
    return jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export default createToken ;
