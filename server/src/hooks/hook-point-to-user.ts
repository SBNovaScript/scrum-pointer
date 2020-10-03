// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
import {DEFAULT_POINT_VALUE} from "../constants";

// Take the user provided point, and map it to the user in the Pointing model.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default (options = {}): Hook => {
  return async (context: HookContext): Promise<HookContext> => {

    // When a channel title is created:
    // initialize a pointing section as well, with the host as the only user.
    // This will be changed in update as more users enter the channel.
    // User's points are initialized to -1.

    context.data =
      {
        ...context.data,
        user_points: {
        }
      };

    const user_id = context.params.user._id;

    context.data.user_points[user_id] = DEFAULT_POINT_VALUE;

    return context;
  };
};
