import React from "react";
import Relay from "react-relay";
import {ErrorScreen} from "../../common/ui/ErrorScreen";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";
import {getCurrentUserId} from "../../network/RelayNetworkConfig";

export function createRootRelayComponent(PageContainer, QueryConfig, queryParamsProvider: ?Function) {
    return (parentProps) => {
        let queryParams = queryParamsProvider && queryParamsProvider(parentProps);
        return (
            <Relay.Renderer
                environment={Relay.Store}
                Container={PageContainer}
                queryConfig={new QueryConfig(queryParams)}
                render={({done, error, props, retry, stale}) => {
        if (error) {
          return <ErrorScreen error={error}/>;
        } else if (props) {
          return <PageContainer {...props} {...parentProps} currentUserId={getCurrentUserId()}/>;
        } else {
          return <LoadingScreen />;
        }
      }}
            />
        )
    };
}

export const routeConfigParamsBuilder = (prevParams) => {
    var p = {
        ...prevParams,
        token: getAuthTokenUsedByRelay(),
        currentUserId: getCurrentUserId()
    };
    console.log("created route params");
    console.log(p);

    return p;
};