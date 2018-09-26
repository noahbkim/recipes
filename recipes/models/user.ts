import { Document, Model, model, Schema } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';
import { asNotEmpty, asOptionalString, asString } from '../library/validators';


export interface User extends Document {
  username: string;
}


export const UserSchema = new Schema({});
UserSchema.plugin(passportLocalMongoose);

UserSchema.methods.toJSON = function(): {} {
  return {username: this.username};
};

UserSchema.statics.fromJSON = function(data: any): Promise<User> {
  return new Promise((resolve, reject) => {
    const user = new UserModel();
    try {
      user.username = asNotEmpty(asString(data.username, 'invalid name'), 'empty name');
      (user as any).setPassword(asNotEmpty(asString(data.password), 'empty password')).then(() => {
        resolve(user);
      }).catch(() => {
        reject('database error');
      });
    } catch (error) {
      reject(error);
    }
  });
};

export const UserModel: Model<User> = model<User>('User', UserSchema);
