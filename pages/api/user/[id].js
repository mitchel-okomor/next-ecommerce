import connectDB from '../../../utils/connectDB';
import Users from '../../../models/userModel';
import { auth } from '../../../middleware/auth';

connectDB();

export default async (req, res) => {
  console.log(req);

  switch (req.method) {
    case 'PATCH':
      await updateRole(req, res);
      break;
    case 'DELETE':
      await deleteUser(req, res);
      break;
  }
};

const updateRole = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin' && !result.root)
      return res.status(401).json({ err: 'Unauthorized' });
    const { id } = req.query;
    const { role } = req.body;

    await Users.findOneAndUpdate({ _id: id }, { role });
    res.json({ msg: 'updated successfully' });
  } catch (err) {
    return res.status(500).json({ err: err.msg });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.role !== 'admin' && !result.root)
      return res.status(401).json({ err: 'Unauthorized' });
    const { id } = req.query;
    await Users.findOneAndDelete({ _id: id });
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({ err: err.msg });
  }
};
