import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

export class Channel extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  async create(params?: Params) {
    
    const date = moment();

    const getChannelGuid = () => {
      return cryptoRandomString({length: 6});
    };

    const PointingObject = {
      channel: getChannelGuid(),
      date
    };

    return PointingObject;
  }

}
