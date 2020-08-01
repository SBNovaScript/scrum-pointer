// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import { RealTimeConnection } from '@feathersjs/transport-commons/lib/channels/channel/base';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    // If the user is already in the channel, this will not do anything.
    context.app.channel(context.result.channel).join(context.params.connection as RealTimeConnection);
    
    return context;
  };
};
