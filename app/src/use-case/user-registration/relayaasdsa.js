class CreateCommentMutation extends Relay.Mutation {
    static fragments = {
        story: () => Relay.QL`
      fragment on Story { id }
    `,
    };
    getMutation() {
        return Relay.QL`
      mutation{ createComment }
    `;
    }
    getFatQuery() {
        return Relay.QL`
      fragment on CreateCommentPayload { 
        story { comments },
      }
    `;
    }
    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: { story: this.props.story.id },
        }];
    }
    getVariables() {
        return { text: this.props.text };
    }
}

class Comment extends React.Component {
    render() {
        var {id, text} = this.props.comment;
        return <li key={id}>{text}</li>;
    }
}
Comment = Relay.createContainer(Comment, {
    fragments: {
        comment: () => Relay.QL`
      fragment on Comment {
        id,
        text,
      }
    `,
    },
});

class Story extends React.Component {
    _handleSubmit = (e) => {
        e.preventDefault();
        Relay.Store.update(
            new CreateCommentMutation({
                story: this.props.story,
                text: this.refs.newCommentInput.value,
            })
        );
        this.refs.newCommentInput.value = '';
    }
    render() {
        var {comments} = this.props.story;
        return (
            <form onSubmit={this._handleSubmit}>
                <h1>Breaking News</h1>
                <p>The peanut is neither a pea nor a nut.</p>
                <strong>Discuss:</strong>
                <ul>
                    {comments.map(
                        comment => <Comment comment={comment} />
                    )}
                </ul>
                <input
                    placeholder="Weigh in&hellip;"
                    ref="newCommentInput"
                    type="text"
                />
            </form>
        );
    }
}
Story = Relay.createContainer(Story, {
    fragments: {
        story: () => Relay.QL`
      fragment on Story {
        comments {
          ${Comment.getFragment('comment')},
        },
        ${CreateCommentMutation.getFragment('story')},
      }
    `,
    },
});

class StoryHomeRoute extends Relay.Route {
    static routeName = 'Home';
    static queries = {
        story: (Component) => Relay.QL`
      query StoryQuery {
        story { ${Component.getFragment('story')} },
      }
    `,
    };
}

ReactDOM.render(
    <Relay.RootContainer
        Component={Story}
        route={new StoryHomeRoute()}
    />,
    mountNode
);