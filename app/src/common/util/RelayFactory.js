import React from "react";
import Relay from "react-relay";
import {ErrorScreen} from "../../common/ui/ErrorScreen";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";
import {getCurrentUserId} from "../../network/RelayNetworkConfig";

export function createRelayRenderer(PageContainer, queryConfigFunction) {
    return (parentProps) => {
        return (
            <Relay.Renderer
                environment={Relay.Store}
                Container={PageContainer}
                queryConfig={queryConfigFunction(parentProps)}
                render={({done, error, props, retry, stale}) => {
        if (error) {
          return <ErrorScreen error={error}/>;
        } else if (props) {
          return <PageContainer {...parentProps} {...props} />;
        } else {
          return <LoadingScreen />;
        }
      }}
            />
        )
    };
}

export const routeConfigParamsBuilder = (prevParams) =>
    ({
        ...prevParams,
        token: getAuthTokenUsedByRelay(),
        currentUserId: getCurrentUserId()
    });