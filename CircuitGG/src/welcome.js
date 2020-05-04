require('./main_style.scss');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DesktopAppBar from './widget/DesktopAppBar';
import MobileAppBar from './widget/MobileAppBar';
import WelcomeContent from './widget/WelcomeContent'
import { MuiThemeProvider } from 'material-ui/styles';
import MainTheme from './theme';
import Hidden from 'material-ui/Hidden';

class Welcome extends Component {

    render() {
        return (
            <MuiThemeProvider theme={MainTheme}>
                <Hidden xsDown>
                    <DesktopAppBar />
                </Hidden>
                <Hidden smUp>
                    <MobileAppBar />
                </Hidden>
                <WelcomeContent />
            </MuiThemeProvider>
        );
    }
}   

ReactDOM.render(<Welcome />, document.getElementById('root'))

console.log('from welcome');