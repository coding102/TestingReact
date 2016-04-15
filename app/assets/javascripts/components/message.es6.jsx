class Message extends React.Component {
  render () {
    return (
      <div>
        <div>Hello {this.props.name}!</div>
      </div>
    );
  }
}

Message.propTypes = {
  name: React.PropTypes.string
};
