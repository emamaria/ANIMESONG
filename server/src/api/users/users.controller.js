const User = require('./users.model');
const bcrypt = require('bcrypt');
const JwtUtils = require('../../utils/jwt/jwt');
const { setError } = require('../../utils/error/error');

const register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        
        const userExist = await User.findOne({ email: user.email })
        if (userExist) {
          
            return next(setError(404, 'This Email already exists'))
        }

       console.log(user);
        const userDB = await user.save();
        return res.status(201).json(userDB.name)

    } catch (error) {
        console.log(error);
        return next(setError(400, 'Cannot register'))
    }
}

const login = async (req, res, next) => {
    try {
        
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
           
            return next(setError(404, 'This Email doesnt  exist'))
        }
       
        if (bcrypt.compareSync(req.body.password, user.password)) {
          
            const token = JwtUtils.generateToken(user._id, user.email);
            console.log(token);
            return res.status(200).json(token);
        }
    } catch (error) {
        return next(setError(400, 'Cannot login'))
    }
}

const logout = (req, res, next) => {
    try {
      
        const token = null;
        return res.status(201).json(token)
    } catch (error) {
        return next(setError(400, 'Cannot logout'))
    }
}

module.exports = { register, login, logout }

