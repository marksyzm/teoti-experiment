/* jshint unused: false, quotmark: false */
"use strict";
var React = require("react");
module.exports = function () {
    return (
        <div className="likeDislike">
            <a className="dislike" href>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24">
                    <polygon fill="#666666" points="23,3 12,21 1,3 "/>
                </svg>
            </a>
            <div>{this.props.post.score}</div>
            <a className="like" href>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 24 24" width="24" height="24">
                    <polygon fill="#666666" points="1,21 12,3 23,21 "/>
                </svg>
            </a>
        </div>
    );
};