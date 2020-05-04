import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import MailFolderListItems from './titleData';
import Menu from 'material-ui/Menu';
import Button from 'material-ui/Button';

const styles = theme => ({
  appTitle: {
    flex: 1,
    textDecoration: 'none'
  },
  avatar: {
    margin:10,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  menu: {
    top: '0 !important',
  },
  menu2: {
    top: '0 !important',
    right: '0 !important',
    left: 'auto !important',
    marginTop: 60
  },
  menuButton: {
    marginRight: 36,
    [theme.breakpoints.down('xs')]: {
      marginRight: 16
    },
  },
  user:{
    display: 'flex',
    alignItems: 'center'
  }
});

//Mobile version of the appbar, with drawer replaced by dropdown menu
class MobileAppBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      userinfo: {},
      isAuthenticated: false
    };
  }

  componentDidMount() {
    if(localStorage.getItem("user_id") != null){
      fetch("http://ggcvan.bbeau.ca/api/Users/" + localStorage.getItem("user_id"))
        .then(response => response.json())
        .then(userinfo =>{
          this.setState({ userinfo })
          this.setState({ isAuthenticated : true})
        });
    }
  }

  checkLoginStatus = () => {
    const { classes } = this.props;
    if(this.state.isAuthenticated){
      return  <div className={classes.user}>
                <Avatar size={40} 
                  className={classes.avatar} 
                  aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleOpen2}
                  src={this.state.userinfo.pictureUrl}/>
                <Typography style={{color: '#ffffff'}}>{this.state.userinfo.userName}</Typography>
                <Menu id="simple-menu"
                  anchorel={this.state.anchorEL2}
                  open={Boolean(this.state.anchorEL2)} 
                  onClose={this.handleClose2}
                  classes={{paper: classes.menu2}}>
                    <List>
                      <ListItem button component="a" href="profile.html"><ListItemText primary="Profile" /></ListItem>
                      <ListItem button onClick={this.logOut}><ListItemText primary="Logout" /></ListItem>
                    </List>
                </Menu>
              </div>
    } else {
      return <Button key="login_btn" href="login.html">Login</Button>
    }
  }

  handleOpen = (event) => {
    this.setState({ anchorEL: event.currentTarget });
  }

  handleClose = () => {
    this.setState({ anchorEL: null });
  }

  handleOpen2 = (event) => {
    this.setState({ anchorEL2: event.currentTarget });
  }

  handleClose2 = () => {
    this.setState({ anchorEL2: null });
  }

  logOut = () => {
    localStorage.clear();
    window.location.replace("./welcome.html");
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AppBar>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open"
              aria-owns={this.state.anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleOpen}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.appTitle} component="a" href="welcome.html">The Good Gaming Circuit</Typography>
            {this.checkLoginStatus()}
          </Toolbar>
        </AppBar>
        <Menu id="simple-menu"
          anchorel={this.state.anchorEL}
          open={Boolean(this.state.anchorEL)} 
          onClose={this.handleClose}
          classes={{paper: classes.menu}}>
            <List><MailFolderListItems/></List>
        </Menu>
      </div>
    );
  }
}

MobileAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MobileAppBar);
