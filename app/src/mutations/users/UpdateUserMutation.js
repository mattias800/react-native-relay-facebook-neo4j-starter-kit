export class UpdateUserMutation extends Relay.Mutation {
    getMutation() {
        return Relay.QL`
            mutation {
                viewer(token: $token) {
                    actor {
                        updateFields()
                    }
                }
            }
    `;
    }

    getVariables() {
        return {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email
        };
    }

    getFatQuery() {
        return Relay.QL`
        fragment on UserMutationPayload { 
            user { 
                id,
                firstName,
                lastName,
                email,
                profilePhotoUrl
            },
        }
    `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                email: this.props.email
            },
        }];
    }

    static fragments = {
        user: () => Relay.QL`
            fragment on User { 
                id,
            }
            `,
    };


}