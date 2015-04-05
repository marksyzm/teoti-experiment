/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react"),
    LikeDislike = require("../components/partials/like-dislike.jsx");

module.exports = function () {
    var thread = this.props.thread;
    return (
        <li>
            <a href={"members/"+thread.firstPostUser.username+".html"} className="user">
                <img src={"thumbnail?url=http://localhost:8080/img/avatar/"+thread.firstPostUser.avatar}
                    alt={thread.firstPostUser.username} />
            </a>
            <h3><a href={thread.forum.slug+"/"+thread._id+"-"+thread.slug+".html"}>{thread.title}</a></h3>
            <p className="description">{thread.description}</p>

            <div data-media="{{thread.media}}" data-ng-if="thread.media" data-autoplay="true"></div>
            <LikeDislike post={thread.firstPost} />

            <div className="details">
                <a href={thread.forum.slug+"/"} className="icon iconForum">
                    <img src={"img/icons/forum/"+thread.forum._id+"."+thread.forum.iconExt}
                        alt={thread.forum.title} />
                </a>
                <span>{thread.replyCount} messages</span>
                <span>
                    {"By "}
                    <a href={"members/"+thread.firstPostUser.username+".html"} className="user">
                        {thread.firstPostUser.username}
                    </a>
                </span>
            </div>
        </li>
    );
};