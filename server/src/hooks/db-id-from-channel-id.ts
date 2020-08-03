// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const channel = context.data.providedChannel.toString().toLowerCase();

    const channelDb = await context.app.service('channel').find({
      query: {
        channel: channel
      }
    });

    const DbId = channelDb.data[0]._id;

    context.id = DbId;
    context.data = channelDb.data[0];

    return context;
  };
};
