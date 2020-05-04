require('./main_style.scss');

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import DesktopAppBar from './widget/DesktopAppBar';
import { MuiThemeProvider } from 'material-ui/styles';
import MainTheme from './theme';
import LoginContent from './widget/LoginContent';
import Hidden from 'material-ui/Hidden';
import MobileAppBar from './widget/MobileAppBar';

class Login extends Component {

    render() {
        return (
            <MuiThemeProvider theme={MainTheme}>
                <Hidden xsDown>
                    <DesktopAppBar />
                </Hidden>
                <Hidden smUp>
                    <MobileAppBar />
                </Hidden>
                <LoginContent />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Login />,
    document.getElementById('root')
)

console.log('from login');