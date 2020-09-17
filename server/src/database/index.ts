import { MongoClient } from 'mongodb';
import { Database, Listing, User, PasswordResets } from '../types';

export const connectDb = async (): Promise<Database> => {
  const uri = `${process.env.DATABASE_LOCAL}`;
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db('property-listings');
  return {
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
    passwordResets: db.collection<PasswordResets>('passwordResets'),
  };
};
