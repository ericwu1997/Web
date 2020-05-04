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
import CreateEvent from './widget/CreateEvent';
import EventFilter from './widget/EventFilter';
import Hidden from 'material-ui/Hidden';
import MobileAppBar from './widget/MobileAppBar';

class Event extends Component {
    setUrlHistory = () => {
        localStorage.setItem("urlHistory", "event.html");
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
                <EventFilter />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Event />,
    document.getElementById('root')
)

console.log('from event');