/*
  Alexander Self
  9/28/16
  Tour application
  comment.js:
  Individual comments
  {
    sid, img, name, date, text
  }
*/

import React from 'react';


const Comment = ({comment}) => {
  var url = `http://www./${comment.cn}.jpg`;
  const defaultImg = 'img/user.png';
  if (comment.cn === undefined || comment.cn === '') {
    url = defaultImg;
  }
  return (
    <li className="collection-item avatar">
      <img src={url} alt="" className="circle" id="user-img" />
      <span className="title comment-name">{ comment.NAME }</span>
      <p><span id="comment-date">{ comment.DATE }</span> <br />
         <b>{ comment.COMMENTS }</b>
      </p>
      {/*<a href="#!" className="secondary-content"><i className="material-icons">perm_identity</i></a>*/}
    </li>
  );
};

export default Comment;
















































/* END */
