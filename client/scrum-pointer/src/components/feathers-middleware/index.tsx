import { useDispatch } from 'react-redux';
import client from '../../feathers';
import { updateChannel } from '../../redux/actions';

const FeathersMiddleware = () => {
    const dispatch = useDispatch();

    client.service('channel').on('created', (user: any, connection: any) => {
        dispatch(updateChannel(user.channel));
    });

    client.service('channel').on('updated', (connectedChannel: any, connection: any) => {
        client.service('channel').get(connectedChannel.channel).then((result: any) => {
            console.log(result);
        });
    });

    // Used to render nothing.
    return null;
}

export default FeathersMiddleware;