/*
  Alexander Self
  9/28/16
  Tour application
  Comments.js: container for all user generated comments
*/

import React from 'react';
import { TextArea } from './inputs';
import Comment from './comment';
import { generateSID } from './data';


const Comments = ({state, title, user, addComment}) => {
  if (!state) return <li></li>;
  let comments = state.comments;

  const getComment = () => {
    return {
      SID: state.main.ID,
      NAME: user.displayname,
      CN: user.cn,
      COMMENTS: document.getElementById('__STAFFCMT__').value
    };
  };

  function clear() {
    document.getElementById('__STAFFCMT__').value = '';
  }

  return (
    <div className="card z-depth-2">
      <center><h4>{title}</h4></center>
      <hr />
      <div className="row">
        <div className="col s12">
          <TextArea id={"__STAFFCMT__"} label={"Comment"}  />
          <div className="col s12">
            <button
              type="button"
              className="btn waves-effect waves-light"
              onClick={() => {
                addComment(getComment);
                clear();
              }}>
              Submit Comment
            </button>
          </div>
        </div>
      </div>
      <br />
      <ul className="collection">
        {
          comments.map((comment) => (
            <Comment key={comment.ID} comment={comment} />
          ))
        }
      </ul>
    </div>
  );
};

export default Comments;

















































/* END */
