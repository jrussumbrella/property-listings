import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { Database, User } from '../../types';

interface Decoded {
  id: string;
}

export const authenticate = async (
  db: Database,
  req: Request
): Promise<User | null> => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY));
    const user = await db.users.findOne({ _id: (decoded as Decoded).id });
    if (!user) return null;
    return user;
  } catch (error) {
    return null;
  }
};
