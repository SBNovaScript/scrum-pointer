import crypto from 'crypto';
import { Service, NedbServiceOptions } from 'feathers-nedb';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';

interface UserData {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  githubId?: string;
}

export class Users extends Service<UserData> {
  constructor(options: Partial<NedbServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: UserData, params?: Params) {
    const { email, password, githubId, name } = data;

    const userData = {
      email,
      password,
      githubId,
      name
    };

    return super.create(userData, params);
  }
}
