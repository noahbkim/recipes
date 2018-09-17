import { Document, Model, model, Schema } from 'mongoose';
import * as passportLocalMongoose from 'passport-local-mongoose';


export interface User extends Document {
  username: string;
}


export const UserSchema = new Schema({});
UserSchema.plugin(passportLocalMongoose);
UserSchema.methods.toJSON = function() {
  return {username: this.username};
};

export const UserModel: Model<User> = model<User>('User', UserSchema);
