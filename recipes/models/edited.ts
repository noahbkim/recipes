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

EditedSchema.statics.update = function(name: string): Promise<Edited> {
  return new Promise<Edited>((resolve: (edited: Edited) => void, reject: (error?: any) => void) => {
    EditedModel.findOne({name}).then((edited?: Edited) => {
      if (edited === null)
        edited = new EditedModel({name});
      edited.edited = new Date();
      edited.save().then(() => resolve(edited), reject);
    }).catch(reject);
  });
};

EditedSchema.statics.get = function(name: string): Promise<Edited> {
  return new Promise<Edited>((resolve: (edited) => void, reject: (error?: any) => void) => {
    EditedModel.findOne({name}).then((edited?: Edited) => {
      if (!edited) (EditedModel as any).update(name).then(resolve, reject);
      else resolve(edited);
    }).catch(reject);
  });
};

export const EditedModel: Model<Edited> = model<Edited>('Edited', EditedSchema);
