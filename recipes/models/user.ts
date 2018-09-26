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

UserSchema.methods.fromJSON = function(data: any): User {
  const user = new UserModel();
  user.username = asNotEmpty(asString(data.username, 'invalid name'), 'empty name');
  (user as any).password = asNotEmpty(asString(data.password), 'empty password');
  return user;
};

export const UserModel: Model<User> = model<User>('User', UserSchema);
