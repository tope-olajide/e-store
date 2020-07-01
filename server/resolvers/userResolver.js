import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { AuthenticationError } from "apollo-server";
import validator from 'validator';

export default {
  Mutation: {
    signup: async (
      parent,
      {data: {email, username, password, fullname }},
      { models: { userModel } },
      info
    ) => {
      try {
          if(!validator.isEmail(email)){
           throw new AuthenticationError('Your e-mail address is invalid')
          }
          if(!validator.isLength(password, {min:5})){
            throw new AuthenticationError('Password must be atleast 5 characters')
          }
          if(!validator.isLength(username, {min:3}))
            {
              throw new AuthenticationError('username must be atleast 3 characters')
            }
          if(!validator.isLength(fullname, {min:4}))
            {
              throw new AuthenticationError('fullname must be atleast 4 characters')
            }
          
        const encryptedPassword = bcrypt.hashSync(password, 10);
        const userData = {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          fullname,
          password: encryptedPassword,
        };
        const createdUser = await userModel.create(userData);
        console.log(createdUser);
        const token = jsonwebtoken.sign(
          {
            id: createdUser._id,
            username: createdUser.username,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
          },
          process.env.JWT_SECRET
        );
        return {
          user: createdUser,
          token,
        };
      } catch (error) {
        if (
            error.name === 'MongoError'
              && error.code === 11000
              && error.errmsg.includes('email')
          ) {
            throw new AuthenticationError('User with this email address exist already')
          } if (
            error.name === 'MongoError'
              && error.code === 11000
              && error.errmsg.includes('username')
          ) {
            throw new AuthenticationError ('User with this username exists already')
            
          }
          throw new AuthenticationError(error)
      }
    },
    signin: async (
      parent,
      { data:{usernameOrEmail, password} },
      { models: { userModel } },
      info
    ) => {
      try {
        console.log(info)
        const userFound = await userModel.findOne({
          $or: [{ email: usernameOrEmail.toLowerCase() },
            { username: usernameOrEmail.toLowerCase() }],
        }).exec();
        if (userFound.role === 'SuperAdmin') {
          return res.status(400).json({
            success: false,
            message: 'You need to login at the admin page',
          });
        }
        if (bcrypt.compareSync(password, userFound.password)) {
          const { username } = userFound;
          const id = userFound._id;
          const token = jsonwebtoken.sign({
            id,
            username,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
          }, process.env.JWT_SECRET);
          return {
            user:userFound,
            token,
          };
        }
          throw new AuthenticationError ('Invalid pasword!');
      }
      catch (error) {
          throw new AuthenticationError (error);
      }
    }
  },
};
