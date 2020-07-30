import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import cryptoRandomString from 'crypto-random-string';

interface ProvidedChannel {
  providedChannel: string
}

interface UserChannel {
  user: string,
  channel: string
}

export class Channel extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async find(params: Params) {
    return [];
  }

  async create(data: ProvidedChannel, params?: Params) {
    const { providedChannel } = data;

    const user = params?.connection?.user?._id;

    const getChannelGuid = () => {
      return cryptoRandomString({length: 6});
    };

    const channel = providedChannel ?? getChannelGuid();

    const userInChannel: UserChannel = {
      user,
      channel
    };

    return super.create(userInChannel);
  }
}
