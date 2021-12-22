import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import jwt from 'jsonwebtoken';
import {
  createAccessToken,
  createRefreshToken
} from '../../../utils/generateToken';

connectDB();

export default async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ err: 'Please login' });

    const result = jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET);
    if (!result)
      return res.status(400).json({ err: 'Invalid or expired token.' });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: 'User does not exist.' });
    const access_token = createAccessToken({ id: user._id });
    return res.status(200).json({
      msg: 'Login successfull',
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        root: user.root
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
