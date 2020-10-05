import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import {Id, Params} from '@feathersjs/feathers';
import {DEFAULT_POINT_VALUE} from '../../constants';

interface ProvidedTitle {
  title: string,
  channel: string
}

interface ProvidedUser {
  channel: string,
  point: number
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

  async update(id: Id, data: ProvidedUser, params?: Params): Promise<UserPoints> {
    // Placeholder update. Will be called when a user submits a point value.

    const {channel, point} = data;

    const userPoints: UserPoints = {
      channel,
      title: 'test',
      user_points: {}
    };

    return super.update(id, userPoints, params);
  }

  async create(data: ProvidedTitle, params?: Params): Promise<UserPoints> {
    // The first time a channel is created, initialize the host's point value to the default initialization value.

    const { title, channel } = data;

    const user = params?.connection?.user?._id;

    const userPoints: UserPoints = {
      title,
      channel,
      user_points: {}
    };

    // Initialize the default user point value.
    userPoints.user_points[user] = DEFAULT_POINT_VALUE;

    return super.create(userPoints);
  }

}
