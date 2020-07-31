import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import cryptoRandomString from 'crypto-random-string';

interface ProvidedChannel {
  providedChannel: string
}

interface UserChannel {
  users: Array<string>,
  channel: string
}

export class Channel extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async get(channel: string, params?: Params) {
    const usersInChannel = await super.find({
      query: {
        channel: channel
      }
    });

    try {
      const allUsersInChannel = Object(usersInChannel).data[0].users;

      return allUsersInChannel;
    } catch (error) {
      return [];
    }
    
  }

  async create(data: ProvidedChannel, params?: Params): Promise<UserChannel> {
    const { providedChannel } = data;

    const user = params?.connection?.user?._id;

    const getChannelGuid = () => {
      return cryptoRandomString({length: 6});
    };

    const channel = providedChannel ?? getChannelGuid();

    const userInChannel: UserChannel = {
      users: [user],
      channel
    };

    return super.create(userInChannel);
  }
}
