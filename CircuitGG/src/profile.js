require('./main_style.scss');

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider } from 'material-ui/styles';
import MainTheme from './theme';
import DesktopAppBar from './widget/DesktopAppBar'
import UserProfile from './widget/ProfileContent';
import Hidden from 'material-ui/Hidden';
import MobileAppBar from './widget/MobileAppBar';

function checkLoginStatus () {
    return localStorage.getItem("user_id")
}

class Profile extends Component {
    setUrlHistory = () => {
        localStorage.setItem("urlHistory", "profile.html");
    }

    render() {
        {this.setUrlHistory()}
        const {classes,theme} = this.props;
        return (
            <MuiThemeProvider theme={MainTheme}>
                <Hidden xsDown>
                    <DesktopAppBar />
                </Hidden>
                <Hidden smUp>
                    <MobileAppBar />
                </Hidden>
                <UserProfile />
            </MuiThemeProvider>
        );
    }
}

if(checkLoginStatus() != null){
    ReactDOM.render(
        <Profile />,
        document.getElementById('root')
    )
} else {
    localStorage.setItem("urlHistory", "profile.html");
    window.location.replace("./login.html");
}


console.log('from profile');