import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server';
import { Request } from 'express';
import { v4 } from 'uuid';
import { Database, Viewer, User } from '../../../types';
import {
  LoginArgs,
  SignUpArgs,
  UpdateProfileArgs,
  ChangePasswordArgs,
  ResetPasswordArgs,
} from './types';
import { ObjectID } from 'mongodb';
import { authenticate } from '../../../lib/utils';
import { sendEmail } from '../../../lib/api/email';
import { Google } from '../../../lib/api';
import crypto from 'crypto';

interface Decoded {
  id: string;
}

const generateToken = (id: string, expiresIn: string): string => {
  const secret = String(process.env.JWT_SECRET_KEY);
  return jwt.sign({ id }, secret, { expiresIn: expiresIn });
};

export const viewerResolvers = {
  Query: {
    me: async (
      _root: undefined,
      {},
      { db, req }: { db: Database; req: Request }
    ): Promise<User | null> => {
      const user = await authenticate(db, req);
      if (!user) throw new Error('Invalid token');
      return user;
    },
  },
  Mutation: {
    login: async (
      _root: undefined,
      { input }: LoginArgs,
      { db }: { db: Database }
    ): Promise<Viewer> => {
      try {
        const { email, password } = input;

        const viewer = await db.users.findOne({ email });
        if (!viewer) throw 'Email or password is incorrect';

        // check viewer input password if match into found viewer
        const isMatch = await bcrypt.compare(password, String(viewer.password));
        if (!isMatch) throw 'Email or password is incorrect';

        // generate token
        const token = generateToken(viewer._id, '7d');

        return {
          user: viewer,
          token,
        };
      } catch (error) {
        throw new AuthenticationError(error);
      }
    },
    loginWithGoogle: async (
      _root: undefined,
      { idToken }: { idToken: string },
      { db }: { db: Database }
    ): Promise<Viewer> => {
      const results = await Google.verifyIdToken(idToken);
      if (!results)
        throw new Error('Cant verify access token. Please try again later.');

      const email = results.email as string;
      const name = results.name as string;
      const googleId = results.sub;
      const photoUrl = results.picture;

      let viewer = await db.users.findOne({ email });

      if (!viewer) {
        const insertResult = await db.users.insertOne({
          _id: new ObjectID().toString(),
          name,
          email,
          listings: [],
          isEmailVerified: true,
          googleId,
          photoUrl,
        });

        viewer = insertResult.ops[0];
      }

      // generate token
      const token = generateToken(viewer._id, '7d');

      return {
        user: viewer,
        token,
      };
    },
    signUp: async (
      _root: undefined,
      { input }: SignUpArgs,
      { db }: { db: Database }
    ): Promise<Viewer> => {
      const { email, name, password } = input;
      // check if email is already taken
      const checkEmailExists = await db.users.findOne({ email });
      if (checkEmailExists) throw new Error('Email is already taken');

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const encryptPassword = await bcrypt.hash(password, salt);

      // inser user to db
      const insertRes = await db.users.insertOne({
        name,
        email,
        password: encryptPassword,
        listings: [],
        _id: new ObjectID().toString(),
        isEmailVerified: false,
      });

      const viewer = insertRes.ops[0];

      // generate access token
      const token = generateToken(viewer._id, '7d');

      const emailVerifyToken = generateToken(viewer._id, '7d');

      const url = `${process.env.CLIENT_URL}/email-confirmation/${emailVerifyToken}`;

      try {
        await sendEmail({
          name: viewer.name,
          from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
          to: viewer.email,
          template: 'email-confirmation',
          subject: 'Welcome to Property Listings',
          url,
          message: 'Thanks for creating an account',
        });
      } catch (error) {
        console.log(error);
      }

      return {
        user: viewer,
        token,
      };
    },
    updateProfile: async (
      _root: undefined,
      { input }: UpdateProfileArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer | undefined> => {
      const { name, email } = input;

      const user = await authenticate(db, req);
      if (!user) throw new Error('Please login first');

      const updateResult = await db.users.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            name,
            email,
          },
        },
        {
          returnOriginal: false,
        }
      );

      const viewer = updateResult.value;

      if (!viewer) throw new Error(`Error in updating profile details.`);

      const userToken = generateToken(viewer._id, '7d');

      return {
        user: viewer,
        token: userToken,
      };
    },
    changePassword: async (
      _root: undefined,
      { input }: ChangePasswordArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Viewer | undefined> => {
      const { oldPassword, newPassword, confirmNewPassword } = input;

      if (newPassword !== confirmNewPassword) {
        throw new Error(
          'New Password and Confirm new Password does not match.'
        );
      }
      const user = await authenticate(db, req);
      if (!user) throw new Error('Please login first');

      // check if input old password match the user current password
      const isMatch = await bcrypt.compare(oldPassword, String(user.password));
      if (!isMatch) throw new Error('Old Password is incorrect');

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const encryptPassword = await bcrypt.hash(newPassword, salt);

      const updateResult = await db.users.findOneAndUpdate(
        { _id: user._id },
        {
          $set: {
            password: encryptPassword,
          },
        },
        {
          returnOriginal: false,
        }
      );

      const viewer = updateResult.value;

      if (!viewer)
        throw new Error(
          `Error in updating new password. Please try again later.`
        );

      const userToken = generateToken(viewer._id, '7d');

      return {
        user: viewer,
        token: userToken,
      };
    },
    emailTokenVerification: async (
      _root: undefined,
      { token }: { token: string },
      { db }: { db: Database }
    ): Promise<Viewer> => {
      const decoded = jwt.verify(token, String(process.env.JWT_SECRET_KEY));

      const userId = (decoded as Decoded).id;
      if (!userId) throw new Error(`Invalid token/ Token expired.`);

      const updateResult = await db.users.findOneAndUpdate(
        { _id: userId },
        {
          $set: {
            isEmailVerified: true,
          },
        },
        {
          returnOriginal: false,
        }
      );

      const viewer = updateResult.value;

      if (!viewer) throw new Error(`Error in validating email address.`);

      const userToken = generateToken(viewer._id, '7d');

      return {
        user: viewer,
        token: userToken,
      };
    },
    forgotPassword: async (
      _root: undefined,
      { email }: { email: string },
      { db }: { db: Database }
    ) => {
      if (!email) throw new Error('Email is required');

      const user = await db.users.findOne({ email });

      if (!user) throw new Error('There is no user registered with that email');

      const passwordReset = await db.passwordResets.findOne({ email });

      // generate reset token
      const resetToken = crypto.randomBytes(20).toString('hex');
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

      const expiredAt = Date.now() + 10 * 60 * 1000;

      if (passwordReset) {
        await db.passwordResets.updateOne(
          { email },
          {
            $set: { token: resetPasswordToken, expiredAt },
          }
        );
      } else {
        await db.passwordResets.insertOne({
          _id: new ObjectID().toString(),
          email,
          token: resetPasswordToken,
          expiredAt,
        });
      }

      const url = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      await sendEmail({
        name: user.name,
        from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
        to: user.email,
        template: 'password-reset',
        subject: 'Reset Password',
        url,
        message:
          'Please click the button to proceed to the link to reset your password',
      });

      return 'Successfully email sent';
    },
    resetPassword: async (
      _root: undefined,
      { input }: ResetPasswordArgs,
      { db }: { db: Database }
    ): Promise<Viewer | undefined> => {
      const { newPassword, confirmNewPassword, token } = input;

      if (newPassword !== confirmNewPassword) {
        throw new Error('New Password and Confirm new Password does not match');
      }

      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const passwordReset = await db.passwordResets.findOne({
        token: resetPasswordToken,
        expiredAt: { $gt: Date.now() },
      });

      if (!passwordReset) {
        throw new Error('Invalid reset token');
      }

      // encrypt password
      const salt = await bcrypt.genSalt(10);
      const encryptPassword = await bcrypt.hash(newPassword, salt);

      const updateRes = await db.users.findOneAndUpdate(
        {
          email: passwordReset.email,
        },
        {
          $set: {
            password: encryptPassword,
          },
        },
        {
          returnOriginal: false,
        }
      );

      const viewer = updateRes.value;

      if (!viewer)
        throw new Error(
          'Error in updating new password. Please try again later'
        );

      await db.passwordResets.deleteOne({ token: resetPasswordToken });

      const userToken = generateToken(viewer._id, '7d');

      return {
        user: viewer,
        token: userToken,
      };
    },
  },
};
