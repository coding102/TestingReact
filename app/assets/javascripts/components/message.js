var Card = React.createClass({
    displayName: "Card",

    getInitialState: function getInitialState() {
        return {};
    },
    componentDidMount: function componentDidMount() {
        var component = this;
        $.get("https://api.github.com/users/" + this.props.login, function (data) {
            component.setState(data);
        });
    },
    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement("img", { src: this.state.avatar_url, width: "80" }),
            React.createElement(
                "h3",
                null,
                this.state.name
            )
        );
    }
});

var Form = React.createClass({
    displayName: "Form",

    //*********** otherwise form submits normally and refreshes the page ***********
    handleSubmit: function handleSubmit(e) {
        e.preventDefault();
        var loginInput = ReactDOM.findDOMNode(this.refs.login);
        // ad the github card here
        this.props.addCard(loginInput.value);
        loginInput.value = '';
    },
    render: function render() {
        return React.createElement(
            "form",
            { onSubmit: this.handleSubmit },
            React.createElement("input", { placeholder: "Github Username", ref: "login" }),
            React.createElement(
                "button",
                { className: "waves-effect waves-light btn" },
                "Add"
            )
        );
    }
});

var Main = React.createClass({
    displayName: "Main",

    getInitialState: function getInitialState() {
        return { logins: [] };
    },
    addCard: function addCard(loginToAdd) {
        this.setState({ logins: this.state.logins.concat(loginToAdd) });
    },
    render: function render() {
        var cards = this.state.logins.map(function (login) {
            return React.createElement(Card, { login: login });
        });
        return React.createElement(
            "div",
            { className: "row" },
            React.createElement(
                "div",
                { className: "input-field col s12" },
                React.createElement(Form, { addCard: this.addCard }),
                cards
            )
        );
    }
});