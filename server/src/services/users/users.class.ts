import crypto from 'crypto';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';

interface UserData {
  _id?: string;
  email: string;
  displayName?: string;
  id?: string;
}

export class Users extends Service<UserData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: UserData, params?: Params) {
    const { id, email, displayName } = data;

    const userData = {
      id,
      email,
      displayName
    };

    return super.create(userData, params);
  }
}
