import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';
import moment from 'moment';
import cryptoRandomString from 'crypto-random-string';

interface PointingData {
  points: number;
}

export class Pointing extends Service<PointingData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }
  
  async create(data: PointingData, params?: Params) {
    const { points } = data;
    
    const date = moment();

    const getChannelGuid = () => {
      return cryptoRandomString({length: 6});
    };

    const PointingObject = {
      points,
      channel: getChannelGuid(),
      date
    };

    return PointingObject;
  }

}