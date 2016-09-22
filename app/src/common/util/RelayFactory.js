import React from "react";
import Relay from "react-relay";
import {ErrorScreen} from "../../common/ui/ErrorScreen";
import {LoadingScreen} from "../../common/ui/LoadingScreen";
import {getAuthTokenUsedByRelay} from "../../network/RelayNetworkConfig";

export function createRootRelayComponent(PageContainer, QueryConfig) {
    return ({navigator}) => {
        return (
            <Relay.Renderer
                environment={Relay.Store}
                Container={PageContainer}
                queryConfig={new QueryConfig()}
                render={({done, error, props, retry, stale}) => {
        if (error) {
          return <ErrorScreen error={error}/>;
        } else if (props) {
          return <PageContainer {...props} navigator={navigator}/>;
        } else {
          return <LoadingScreen />;
        }
      }}
            />
        )
    };
}

export const routeConfigParamsBuilder = (prevParams) => ({...prevParams, token: getAuthTokenUsedByRelay()});