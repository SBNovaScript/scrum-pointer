import { Application } from '../declarations';
import users from './users/users.service';
import pointing from './pointing/pointing.service';
import channel from './channel/channel.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(pointing);
  app.configure(channel);
}