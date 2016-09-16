import Relay from 'react-relay';

export class ViewerProfileQueryConfig extends Relay.Route {
    static routeName = 'ViewerProfile';
    static queries = {
        viewer: (Component) =>
            Relay.QL`
                     query {
                       viewer { ${Component.getFragment('viewer')} },
                     }
        `,
    };
}
