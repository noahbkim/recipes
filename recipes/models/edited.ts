import { Document, Model, model, Schema } from 'mongoose';


export interface Edited extends Document {
  name: string;
  edited: Date;
}


const EditedSchema: Schema = new Schema({
  name: {type: String, unique: true},
  edited: Date
});

EditedSchema.methods.toJSON = function(): {} {
  return {
    name: this.name,
    edited: this.edited
  };
};

export const EditedModel: Model<Edited> = model<Edited>('Ingredient', EditedSchema);
