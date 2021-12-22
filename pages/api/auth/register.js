import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import valid from '../../../utils/valid';
import bcrypt from 'bcrypt';
connectDB();

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await register(req, res);
      break;
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;
    const errMsg = valid(name, email, password, confirmPassword);
    if (errMsg) return res.status(400).json({ error: errMsg });
    const user = await Users.findOne({ email });
    if (user)
      return res.status(400).json({ err: 'This email is already registered' });
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = new Users({ name, email, password: passwordHash });
    const registeredUser = await newUser.save();
    if (registeredUser)
      return res
        .status(200)
        .json({ data: user, msg: 'Registered successfuly' });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
