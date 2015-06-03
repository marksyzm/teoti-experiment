/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react");
var LikeDislike = require("../../../components/partials/like-dislike.jsx");
var Media = require("../../../components/partials/media.jsx");

module.exports = function () {
    var thread = this.props.thread;
    var media;

    if (thread.media) {
        media = ( <Media url={thread.media} /> )
    } else if (thread.thumbnail) {
        media = (
            <a href={thread.forum.slug+"/"+thread._id+"-"+thread.slug+".html"} className="preview">
                <img src={"sickle/thread?url="+thread.thumbnail} alt={thread.title} />
            </a>
        );
    }

    return (
        <li>
            <a href={"members/"+(thread.firstPostUser ? thread.firstPostUser.username : "")+".html"} className="user">
                <img src={"sickle/thumbnail?url=http://localhost:8080/img/avatar/"+(thread.firstPostUser ? thread.firstPostUser.avatar : "")}
                    alt={thread.firstPostUser ? thread.firstPostUser.username : ""} />
            </a>
            <h3><a href={thread.forum.slug+"/"+thread._id+"-"+thread.slug+".html"}>{thread.title}</a></h3>
            <p className="description">{thread.description}</p>
            {media}
            <LikeDislike post={thread.firstPost} />

            <div className="details">
                <a href={thread.forum.slug+"/"} className="icon iconForum">
                    <img src={"img/icons/forum/"+thread.forum._id+"."+thread.forum.iconExt}
                        alt={thread.forum.title} />
                </a>
                <span>{thread.replyCount} messages</span>
                <span>
                    {"By "}
                    <a href={"members/"+(thread.firstPostUser ? thread.firstPostUser.username : "")+".html"} className="user">
                        {thread.firstPostUser ? thread.firstPostUser.username : ""}
                    </a>
                </span>
            </div>
        </li>
    );
};