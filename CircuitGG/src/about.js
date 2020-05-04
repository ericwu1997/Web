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
import AboutContent from './widget/AboutContent';
import Hidden from 'material-ui/Hidden';
import MobileAppBar from './widget/MobileAppBar';

class About extends Component {

    setUrlHistory = () => {
        localStorage.setItem("urlHistory", "about.html");
    }

    render() {
        {this.setUrlHistory()}
        return (
            <MuiThemeProvider theme={MainTheme}>
                <Hidden xsDown>
                    <DesktopAppBar />
                </Hidden>
                <Hidden smUp>
                    <MobileAppBar />
                </Hidden>
                <AboutContent />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <About />,
    document.getElementById('root')
)

console.log('from about');