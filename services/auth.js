import bcrypt from 'bcrypt';
import { issueJwt, responseInfo } from '../helpers/common';
const { models } = require('../database/models');
import {
  HTTP_BAD_REQUEST,
  HTTP_CREATED,
  HTTP_OK,
  HTTP_SERVER_ERROR
} from '../helpers/httpCodes';
import { createAccessToken, createRefreshToken } from '../utils/generateToken';

const User = models.Users;

/**
 * Authenticates User with valid credentials
 * @param {string} userEmail
 * @param {string} password
 * @returns User's login information with a signed token
 */
export const loginUser = async (userEmail, password) => {
  try {
    const user = await User.findOne({
      where: { email: userEmail }
    });
    if (user === null) {
      const error = new Error('Incorrect Email or Password');
      return responseInfo(HTTP_BAD_REQUEST, 'error', null, error.message);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error('Incorrect Email or Password');
      return responseInfo(HTTP_BAD_REQUEST, 'error', null, error.message);
    }

    const loggedInUser = user.dataValues;

    const { id, name, email, role, gender, phone } = loggedInUser;
    const access_token = createAccessToken(loggedInUser);
    const refresh_token = createRefreshToken(loggedInUser);

    const newUser = {
      user: {
        id,
        name,
        email,
        role,
        gender,
        phone
      },
      access_token,
      refresh_token
    };
    return responseInfo(HTTP_OK, 'success', newUser, 'LoggedIn successfully');
  } catch (err) {
    console.log(err);
    // eslint-disable-next-line no-undef
    return responseInfo(HTTP_SERVER_ERROR, 'error', null, err.message);
  }
};

/**
 * Creates a user in the database and returns the user's basic detials.
 *
 * @param {object} data
 * @returns User object
 */
export const createUser = async (data) => {
  const { name, email, password } = data;

  try {
    const user = await User.findOne({
      where: { email }
    });

    if (user !== null) {
      return responseInfo(
        HTTP_BAD_REQUEST,
        'error',
        null,
        'User already exists!'
      );
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const createdUser = await User.create({
      name: name?.trim(),
      email: email?.trim(),
      password: passwordHash
    });
    console.log(createUser);
    const newUser = {
      id: createdUser?.id,
      name: createdUser?.name?.trim(),
      email: createdUser?.email?.trim()
    };

    return responseInfo(
      HTTP_CREATED,
      'success',
      newUser,
      'Registration Successfull! '
    );
  } catch (err) {
    console.log(err);
    if (err) {
      return responseInfo(
        HTTP_SERVER_ERROR,
        'error',
        null,
        'A server error occured'
      );
    }
  }
};

/**
 *
 * @param {String} id
 * @param {Object} data
 * @returns
 */
export const updateUser = async (id, data) => {
  const { name, email } = data;
  try {
    const newIdea = await User.update(
      {
        name,
        email
      },
      {
        where: {
          id: id
        }
      }
    );
    return responseInfo(
      HTTP_CREATED,
      'success',
      newIdea,
      'User updated successful'
    );
  } catch (err) {
    if (err) {
      console.log(err);
      return responseInfo(
        HTTP_SERVER_ERROR,
        'error',
        null,
        'A server error occured!'
      );
    }
  }
};
