import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Params,  NullableId, Id } from '@feathersjs/feathers';
import cryptoRandomString from 'crypto-random-string';

interface ProvidedChannel {
  providedChannel: string
}

interface UserChannel {
  users: Array<string>,
  host: string,
  channel: string
}

export class Channel extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async update(id: Id, data: any, params: Params) {
    const connectionUser = params.user._id;

    const usersAsStrings = data.users.map((user: any) => {
      return user.toString();
    });

    if(!usersAsStrings.includes(connectionUser.toString()))
    {
      const newUsersList = [...data.users, connectionUser];
      data.users = newUsersList;
      return super.update(id, data, params);
    }

    // If the user is already in the channel, do not update the users array.
    return super.update(id, data, params);
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
      host: user,
      channel
    };

    return super.create(userInChannel);
  }
}
