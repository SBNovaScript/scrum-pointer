import { UPDATE_CHANNEL } from "../actions/actions";

const initialState = {
    channel: null
}

const ChannelReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case UPDATE_CHANNEL:
            return {
                ...state, 
                channel: action.channel
            }
        default:
            return state;
    }
}

export default ChannelReducer;