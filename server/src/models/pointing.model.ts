// pointing-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';
import { Model, Mongoose } from 'mongoose';

// Users can abstain / not be available to vote.
class UserPoints {
  private user: string;
  private points: number;

  constructor(user: string, points: number) {
    this.user = user;
    this.points = points;
  }
}

export default function (app: Application): Model<any> {
  const modelName = 'pointing';
  const mongooseClient: Mongoose = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    title: { type: String, required: true },
    users: { type: UserPoints }
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
