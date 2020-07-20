import { UPDATE_CREDENTIALS, UPDATE_CHANNEL } from "./actions"

export const updateCredentials = (credentials: object) => ({
    type: UPDATE_CREDENTIALS,
    ...credentials
});

export const updateChannel = (channel: string) => ({
    type: UPDATE_CHANNEL,
    channel
})