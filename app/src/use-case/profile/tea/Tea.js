class Tea extends React.Component {
    render() {
        var {name, steepingTime} = this.props.tea;
        return (
            <li key={name}>
                {name} (<em>{steepingTime} min</em>)
            </li>
        );
    }
}
Tea = Relay.createContainer(Tea, {
    fragments: {
        tea: () => Relay.QL`
      fragment on Tea {
        name,
        steepingTime,
      }
    `,
    },
});

// --------------------

class TeaStore extends React.Component {
    render() {
        return <ul>
            {this.props.store.teas.map(
                tea => <Tea tea={tea} />
            )}
        </ul>;
    }
}
TeaStore = Relay.createContainer(TeaStore, {
    fragments: {
        store: () => Relay.QL`
      fragment on Store {
        teas { ${Tea.getFragment('tea')} },
      }
    `,
    },
});

// --------------------

class TeaHomeRoute extends Relay.Route {
    static routeName = 'Home';
    static queries = {
        store: (Component) => Relay.QL`
      query TeaStoreQuery {
        store { ${Component.getFragment('store')} },
      }
    `,
    };
}

// --------------------

ReactDOM.render(
    <Relay.RootContainer
        Component={TeaStore}
        route={new TeaHomeRoute()}
    />,
    mountNode
);
