import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import valid from '../../../utils/valid';
import bcrypt from 'bcrypt';
import {
  createAccessToken,
  createRefreshToken
} from '../../../utils/generateToken';
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await login(req, res);
      break;
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) return res.status(400).json({ err: 'This user does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ err: 'Email or password incorrect' });

    const access_token = createAccessToken({ id: user._id });
    const refresh_token = createRefreshToken({ id: user._id });
    return res.status(200).json({
      msg: 'Login successfull',
      refresh_token,
      access_token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        avater: user.avatar,
        root: user.root
      }
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
