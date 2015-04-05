/* jshint unused: false, quotmark: false */
"use strict";

var React = require("react"),
    svgLogo = require("./svg/logo"),
    svgNavigation = require("./svg/navigation"),
    svgSubmit = require("./svg/submit"),
    svgShout = require("./svg/shout"),
    svgConversation = require("./svg/conversation"),
    svgNotification = require("./svg/notification"),
    search = require("./search");

module.exports = function () {
    return (
        <header role="banner" data-ng-controller="Header">
            <div>
                <nav className="navigation">
                    <ul>
                        <li className="home"><a href="/" rel="home">{svgLogo}</a></li>
                        <li className="menuButton">
                            <a href="" data-ng-click="toggleNavigation($event)" data-ng-class="{ showNavigation : showNavigation }">
                                <span data-ng-bind="currentNav">Home</span>
                                {svgNavigation}
                            </a>
                        </li>
                    </ul>
                </nav>
                <nav className="account">
                    <ul className="accountMenu accountMenuLoggedOut ng-cloak" data-ng-show="!account.username">
                        <li className="search" data-ng-controller="Search">
                            {search}
                        </li>
                        <li className="submit"><a href="sign-in">{svgSubmit} <span>Submit</span></a></li>
                        <li className="signIn"><a href="sign-in">Sign in</a></li>
                    </ul>
                    <ul className="accountMenu accountMenuLoggedIn ng-cloak" data-ng-show="account.username">
                        <li className="search" data-ng-controller="Search">{search}</li>
                        <li><a href="submit" className="submit">{svgSubmit} <span>Submit</span></a></li>
                        <li><a href="" className="shouts" data-ng-click="toggleAccount($event, 'shouts')" data-ng-class="{ active: toggleActive(null, 'shouts') }">
                            {svgShout}
                            <span>Shouts</span>
                            <small data-ng-bind="account.shouts || 0"></small>
                        </a></li>
                        <li><a href="" className="conversations"
                               data-ng-click="toggleAccount($event, 'conversations')"
                               data-ng-class="{ active: toggleActive('messagesUnread', 'conversations') }">
                            {svgConversation}
                            <span>Conversations</span>
                            <small data-ng-bind="account.messagesUnread || 0"></small>
                        </a></li>
                        <li><a href="" className="notifications"
                               data-ng-click="toggleAccount($event, 'notifications')"
                               data-ng-class="{ active: toggleActive('notifications','notifications') }">
                            {svgNotification} <span>Notifications</span>
                            <small data-ng-bind="account.notifications || 0"></small>
                        </a></li>
                        <li>
                            <a className="user"
                               data-ng-href="'/members/'+this.props.account.usernameUrl"
                               data-ng-click="toggleAccount($event, 'settings')"
                               data-ng-class="{ active: toggleActive(null,'settings') }">
                                <img src="img/default.png" data-ng-src="'img/avatars/'+this.props.account.avatar" alt="{{this.props.account.username}}" />
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            <section data-ng-controller="NavigationMenu"
                     data-ng-include="settings.paths.partials+'/navigation-menu.html'"
                     data-ng-class="{ showNavigation: showNavigation }"
                     data-ng-click="menuClick($event)"></section>
            <section data-ng-controller="AccountMenu"
                     data-ng-include="settings.paths.partials+'/account-menu.html'"
                     data-ng-class="{ showAccount: showAccount }"
                     data-ng-click="menuClick($event)"></section>
        </header>
    );
};