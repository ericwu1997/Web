require('./main_style.scss');

import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { MuiThemeProvider } from 'material-ui/styles';
import MainTheme from './theme';
import DesktopAppBar from './widget/DesktopAppBar'
import Hidden from 'material-ui/Hidden';
import MobileAppBar from './widget/MobileAppBar';
import SignupContent from './widget/SignupContent';

class Signup extends Component {
    render(){
        const {classes,theme} = this.props;
        return (
            <MuiThemeProvider theme={MainTheme}>
                <Hidden xsDown>
                    <DesktopAppBar />
                </Hidden>
                <Hidden smUp>
                    <MobileAppBar />
                </Hidden>
                <SignupContent />
            </MuiThemeProvider>
        );
    }
}

ReactDOM.render(
    <Signup />,
    document.getElementById('root')
)

console.log('from signup');