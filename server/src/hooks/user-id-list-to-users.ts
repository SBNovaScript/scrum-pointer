// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {
    const allUsersInChannel = context.result;

    // If the user has requested a channel that does not exist,
    // do not attempt to get the users information.
    if (context.result.length === 0) {
      return context;
    }

    const fullUsersInfo = await Promise.all(allUsersInChannel.map((user: any) => {
      return context.app.service('users').get(user);
    }));

    context.result = fullUsersInfo;

    return context;
  };
};
