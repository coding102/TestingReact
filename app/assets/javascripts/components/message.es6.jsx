var Card = React.createClass({
    getInitialState: function() {
        return {};
    },

    componentDidMount: function() {
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function(data) {
            component.setState(data);
        });
    },
    render: function(){
        return (
            <div>
                <img src={this.state.avatar_url} width="80" />
                <h3>{this.state.name}</h3>
            </div>
        );
    }
});


var Form = React.createClass({
    //*********** otherwise form submits normally and refreshes the page ***********
    handleSubmit: function(e) {
        e.preventDefault();
        var loginInput = ReactDOM.findDOMNode(this.refs.login);
        // ad the github card here
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    },

    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input placeholder="Github Username" ref="login" />
                <button className="waves-effect waves-light btn">Add</button>
            </form>
        );
    }
});

var Main = React.createClass({
    getInitialState: function () {
        return {logins: []};
    },

    addCard: function(loginToAdd) {
        this.setState({logins: this.state.logins.concat(loginToAdd)});
    },

    render: function () {
        var cards = this.state.logins.map(function(login) {
            return (<Card login={login} />);
        });
        return (
            <div className="row">
                <div className="input-field col s12">
                    <Form addCard={this.addCard} />
                    {cards}
                </div>
            </div>
        )
    }
});



