import { Document, Model, model, Schema,  } from 'mongoose';


export interface Edited extends Document {
  name: string;
  edited: Date;
}


const EditedSchema: Schema = new Schema({
  name: {type: String, unique: true},
  edited: {type: Date}
});

EditedSchema.methods.toJSON = function(): {} {
  return {
    name: this.name,
    edited: this.edited
  };
};

EditedSchema.statics.update = function(name: string): Promise<void> {
  return new Promise<void>((resolve: Function, reject: Function) => {
    const update = (edited: Edited) => {
      edited.edited = new Date();
      edited.save().then(() => resolve(), () => reject());
    };
    EditedModel.findOne({name}).exec().then(
      update,
      () => update(new EditedModel({name}))
    );
  });
};

export const EditedModel: Model<Edited> = model<Edited>('Edited', EditedSchema);
