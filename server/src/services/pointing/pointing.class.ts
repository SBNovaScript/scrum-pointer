import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import {Params} from '@feathersjs/feathers';
import cryptoRandomString from 'crypto-random-string';

interface ProvidedTitle {
  title: string,
  channel: string
}

// user_points represents an object which holds user id's as keys, and points as values.
interface UserPoints {
  channel: string,
  title: string,
  user_points: Record<string, number>
}

export class Pointing extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: ProvidedTitle, params?: Params): Promise<UserPoints> {
    // The first time a channel is created, initialize the host's point value to -1.

    const { title, channel } = data;

    const user = params?.connection?.user?._id;

    const userPoints: UserPoints = {
      title,
      channel,
      user_points: {}
    };

    userPoints.user_points[user] = -1;

    return super.create(userPoints);
  }

}
