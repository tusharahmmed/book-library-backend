import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema<IUser, UserModel>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    fullName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// statics
userSchema.statics.isUserExist = async function (email) {
  const user = await User.findOne(
    { email },
    {
      password: 1,
      _id: 1,
      email: 1,
      fullName: 1,
    },
  );

  return user;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword,
  savedPassword,
) {
  const matched = await bcrypt.compare(givenPassword, savedPassword);
  return matched;
};

// pre hooks
userSchema.pre('save', async function (next) {
  // hass password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
