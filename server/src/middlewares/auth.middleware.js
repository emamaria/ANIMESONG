const User = require('../api/users/users.model');
const JwtUtils = require('../utils/jwt/jwt');
const { setError } = require('../utils/error/error');

const isAuth = async (req, res, next) => {
    try {
       
        const token = req.headers.authorization;
        if (!token) {
        
            return next(setError(400, 'This token doesnt exist'));
        }
        
        const parsedToken = token.replace('Bearer ', '');
        const validToken = JwtUtils.verifyToken(parsedToken, process.env.JWT_SECRET);
        const userLogued = await User.findById(validToken.id);
        req.user = userLogued;
        next();
    } catch (error) {
        return next(setError(400, 'Cannot authenticate'))
    }
}

module.exports = { isAuth }