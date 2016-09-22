import Relay from "react-relay";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";
import {getCurrentUserId} from "../../network/RelayNetworkConfig";

export class ViewerQueryConfig extends Relay.Route {
    static routeName = 'AppHomeRoute';

    static prepareParams = (prevParams) => ({
        ...prevParams,
        token: getAuthTokenUsedByRelay(),
        currentUserId: getCurrentUserId()
    });

    static queries = {
        viewer: (Component) =>
            Relay.QL`
                     query {
                        viewer(token: $token)
                     }
        `,
    };
}
