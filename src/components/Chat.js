import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import { ListGroup, ListGroupItem } from "reactstrap";
import "../style.css";
const axios = require("axios");

class Chat extends React.Component {
  ws = new WebSocket(process.env.REACT_APP_WS_URL);
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      messages: [],
      message: ''
    };
  }
  componentWillMount() {
    document.title = "Login";
  }
  async componentDidMount() {
    this.getPreviousMsg()
    this.ws.onopen = (websocket) => {
      // on connecting, do nothing but log it to the console
      console.log("connected");
      const data = JSON.stringify({
        MessageType: "JOIN",
        sender: this.props.token.token,
        receiver: this.props.match.params.id,
        MessageContentType: "TEXT",
        content: "",
      });
      this.ws.send(data);

    };

    this.ws.onmessage = (evt) => {
      const rawMessages = [...this.state.messages];
      rawMessages.push({ content: evt.data });
      this.setState({ messages: rawMessages });
      console.log("received message", evt.data);
    };
    console.log("logged", this.props.token);
    console.log("receiver", this.props.match.params.id);
    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/users",
    });
    this.setState({ users: data.data });
    console.log(this.state);
  }
  getPreviousMsg = async () => {
    const { data } = await axios({
      method: "get",
      url: `http://localhost:5000/chats/${this.props.token.token}/${this.props.match.params.id}`,
    });
    this.setState({ messages: data.data });
  }
  sendMsg = () => {
    console.log(this.ws);
    const sender = this.props.token;
    console.log("ss", sender);
    const data = {
      MessageType: "CHAT",
      sender: this.props.token.token,
      receiver: this.props.match.params.id,
      MessageContentType: "TEXT",
      content: this.state.message,
    }
    this.ws.send(JSON.stringify(data));
    const rawMessages = [...this.state.messages];
    rawMessages.push(data);
    this.setState({ messages: rawMessages });
    this.setState({ message: '' });
  };

  login = async () => {
    const { data } = await axios({
      method: "get",
      url: "http://localhost:5000/users",
    });
    this.props.history.push("/home");
    console.log(data);
  };
  setMsg = (e) => {
    this.setState({ message: e.target.value });
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
  alertClicked = (receiver) => {
    console.log(receiver);
  };

  render() {
    return (
      <div className="container">
        <h3 className=" text-center">
          Messaging with {this.props.match.params.name}
        </h3>
        <div className="messaging">
          <div className="inbox_msg">
            {/* <div className="inbox_people">
              <div className="headind_srch">
                <div className="recent_heading">
                  <h4>Recent</h4>
                </div>
                <div className="srch_bar">
                  <div className="stylish-input-group">
                    <input
                      type="text"
                      className="search-bar"
                      placeholder="Search"
                    />
                    <span className="input-group-addon">
                      <button type="button">
                        {" "}
                        <i className="fa fa-search" aria-hidden="true"></i>{" "}
                      </button>
                    </span>
                  </div>
                </div>
              </div>
              <div className="inbox_chat">
                <div className="chat_list active_chat">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Sunil Rajput <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="chat_list">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Sunil Rajput <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="chat_list">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Sunil Rajput <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="chat_list">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Sunil Rajput <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="chat_list">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Sunil Rajput <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="chat_list">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Sunil Rajput <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="chat_list">
                  <div className="chat_people">
                    <div className="chat_img">
                      {" "}
                      <img
                        src="https://ptetutorials.com/images/user-profile.png"
                        alt="sunil"
                      />{" "}
                    </div>
                    <div className="chat_ib">
                      <h5>
                        Sunil Rajput <span className="chat_date">Dec 25</span>
                      </h5>
                      <p>
                        Test, which is a new approach to have all solutions
                        astrology under one roof.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <div className="mesgs">
              <div className="msg_history">
                {this.state.messages.map((message) => {
                  return (
                    <span>
                      {message.sender !== this.props.token.token ? <div className="incoming_msg">
                        <div className="incoming_msg_img">
                          <img
                            src="https://ptetutorials.com/images/user-profile.png"
                            alt="sunil"
                          />{" "}
                        </div>
                        <div className="received_msg">
                          <div className="received_withd_msg">
                            <p>{message.content}</p>
                            {/* <span className="time_date"> 11:01 AM | June 9</span> */}
                          </div>
                        </div>
                      </div> : <div className="outgoing_msg">
                          <div className="sent_msg">
                            <p>
                              {message.content}
                            </p>
                            <span className="time_date"> 11:01 AM | June 9</span>{" "}
                          </div>
                        </div>}



                    </span>
                  );
                })}
              </div>
              <div className="type_msg">
                <div className="input_msg_write">
                  <input
                    type="text"
                    className="write_msg"
                    placeholder="Type a message"
                    value={this.state.message}
                    onChange={(e) => this.setMsg(e)}
                    onKeyPress={event => {
                      if (event.key === 'Enter') {
                        this.sendMsg()
                      }
                    }}
                  />
                  <button
                    className="msg_send_btn"
                    type="button"
                    onClick={() => this.sendMsg()}
                  >
                    <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  login: (token) => dispatch({ type: "Store", token }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
// export default Login
