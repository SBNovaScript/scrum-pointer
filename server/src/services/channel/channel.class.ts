import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import moment from 'moment';
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
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: ProvidedChannel, params?: Params) {
    const { providedChannel } = data;

    const user = params?.connection?.user?._id;

    const date = moment();

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
