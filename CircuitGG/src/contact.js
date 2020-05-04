require('./main_style.scss');

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DesktopAppBar from './widget/DesktopAppBar';
import ContactContent from './widget/ContactContent';
import { MuiThemeProvider } from 'material-ui/styles';
import MainTheme from './theme';
import Hidden from 'material-ui/Hidden';
import MobileAppBar from './widget/MobileAppBar';

class Contact extends Component {
    setUrlHistory = () => {
        localStorage.setItem("urlHistory", "contact.html");
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
                <ContactContent />
            </MuiThemeProvider>
        );
    }
} 

ReactDOM.render(
    <Contact />, document.getElementById('root')
)

console.log('from contact');