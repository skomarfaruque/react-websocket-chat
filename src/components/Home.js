import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem } from "reactstrap";
const axios = require("axios");
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }
  componentWillMount() {
    document.title = "Login";
  }
  async componentDidMount() {
    console.log("logged", this.props.token);
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}users`,
    });
    this.setState({ users: data.data });
    console.log(this.state);
  }

  login = async () => {
    const { data } = await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}users`,
    });
    this.props.history.push("/home");
    console.log(data);
  };

  handleReset(e) {
    e.preventDefault();

    this.refs.form.resetFields();
  }

  bindEmail = (e) => {
    this.setState({ email: e.target.value });
    console.log(this.state);
  };

  bindPassword = (e) => {
    this.setState({ password: e.target.value });
    console.log(this.state);
  };
  alertClicked = (receiver, name) => {
    console.log(receiver);
    this.props.history.push(`/chat/${receiver}/${name}`);
  };

  render() {
    return (
      <ListGroup>
        {this.state.users.map((user) => {
          return (
            <ListGroupItem
              {...(this.props.token === user._id ? "disabled" : "")}
              onClick={() => this.alertClicked(user._id, user.name)}
              tag="a"
              href="#"
              action
            >
              Click to chat with {user.name} / {user.email}
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch({ type: "Store", token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
// export default Login
