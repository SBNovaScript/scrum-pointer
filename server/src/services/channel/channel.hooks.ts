import * as authentication from '@feathersjs/authentication';
import userIdListToUsers from '../../hooks/user-id-list-to-users';
import dbIdFromChannelId from '../../hooks/db-id-from-channel-id';
import joinSpecifiedChannel from '../../hooks/join-specified-channel';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [dbIdFromChannelId()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [userIdListToUsers()],
    create: [joinSpecifiedChannel()],
    update: [joinSpecifiedChannel()],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
