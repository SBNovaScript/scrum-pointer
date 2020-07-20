// Initializes the `channel` service on path `/channel`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Channel } from './channel.class';
import createModel from '../../models/channel.model';
import hooks from './channel.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'channel': Channel & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/channel', new Channel(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('channel');

  service.hooks(hooks);
}
