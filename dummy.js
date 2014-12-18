"use strict";

var Thread = require("./app/models/thread");

Thread.create({ _id: 2, title: "WEEEE" },function (err, thread) {
    if (err) {
        console.error(err);
    } else {
        console.info("CREATED WITH ID!", thread);
        Thread.create({ title: "LAAAAA" }, function (err, thread) {
            if (err) {
                console.error(err);
            } else {
                console.info("CREATED WITHOUT ID!", thread);
            }
        });
    }
});