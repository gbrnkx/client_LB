import React, { Component } from "react";
//import logo from "./logo.svg";
//import "bootstrap/dist/css/bootstrap.css";
//import "./App.css";

import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comments: [],
      loading: false
    };

    this.addComment = this.addComment.bind(this);
  }

  componentDidMount() {
    // loading
    this.setState({ loading: true });

    // get all the comments
    fetch("http://localhost:5000/api/getComments")
      .then(res => res.json())
      .then(res => {
        this.setState({
          comments: res,
          loading: false
        });
      })
      .catch(err => {
        this.setState({ loading: false });
      });
  }

  /**
   * Add new comment
   * @param {Object} comment
   */
  addComment(comment) {
    this.setState({
      loading: false,
      comments: [comment, ...this.state.comments]
    });
  }

  render() {
    return (
      
      <Grid xs={12} container >
        <Grid xs={3} direction="column">  
        <Typography gutterBottom variant="subtitle1">
          Escribe tu comentario              
        </Typography>
        <CommentForm addComment={this.addComment} />

        </Grid>
        <Grid xs={9} direction="column">  
        <CommentList
              loading={this.state.loading}
              comments={this.state.comments}
            />
        </Grid>
      </Grid>

      // <div className="App container bg-light shadow">
      //   <div className="row">
      //     <div className="col-4  pt-3 border-right">
      //       <h6>Say something about React</h6>
      //       <CommentForm addComment={this.addComment} />
      //     </div>
      //     <div className="col-8  pt-3 bg-white">
      //       <CommentList
      //         loading={this.state.loading}
      //         comments={this.state.comments}
      //       />
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Chat;