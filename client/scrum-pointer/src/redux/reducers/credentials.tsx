import { UPDATE_CREDENTIALS } from "../actions/actions"

const initialState = {
    accessToken: null,
    username: null,
    displayName: null,
    email: null
}

const CredentialsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_CREDENTIALS:
            return {
                ...state, 
                ...action
            }
        default:
            return state;
    }
}

export default CredentialsReducer;