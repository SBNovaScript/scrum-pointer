import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import { Params } from '@feathersjs/feathers';

interface UserData {
  _id?: string;
  email: string;
  password: string;
  name?: string;
  avatar?: string;
  githubId?: string;
  googleId?: string;
  gravatar?: string;
}

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async create(data: UserData, params?: Params) {
    const { email, password, githubId, googleId, name, gravatar } = data;

    console.log(data);
    
    const userData = {
      email,
      password,
      githubId,
      googleId,
      gravatar,
      name
    };

    return super.create(userData, params);
  }
}
