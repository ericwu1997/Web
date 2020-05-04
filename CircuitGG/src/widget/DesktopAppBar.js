import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import MailFolderListItems from './titleData';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';

const drawerWidth = 240;

const styles = theme => ({
  appBar: {
    position: 'absolute',
    color : '#ffffff',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appTitle: {
    flex: 1,
    textDecoration: 'none'
  },
  avatar: {
    margin:10,
    textDecoration: 'none',
    cursor: 'pointer'
  },
  chevron: {
    color: theme.palette.primary.light
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerInner: {
    // Make the items inside not wrap when transitioning:
    width: drawerWidth
  },
  drawerPaper: {
    position: 'absolute',
    height: 'auto',
    width: drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    width: 60,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.down('xs')]: {
      width: 0
    },
  },
  hide: {
    display: 'none',
  },
  menu: {
    top: '0 !important',
    right: '0 !important',
    left: 'auto !important',
    marginTop: 60
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  user:{
    display: 'flex',
    alignItems: 'center'
  },
});

//Appbar and drawer used on devices larger than xs
class DesktopAppBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  //Retrieves user object of the currently logged in user
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

  //Checks whether user is logged in and change appbar UI accordingly (Login button or user avatar/name)
  checkLoginStatus = () => {
    const { classes } = this.props;
    if(this.state.isAuthenticated){
      return <div className={classes.user}>
              <Typography style={{color: '#ffffff'}}>{this.state.userinfo.userName}</Typography>
              <Avatar size={40} 
                className={classes.avatar} 
                aria-owns={this.state.anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleOpen}
                src={this.state.userinfo.pictureUrl}/>
              <Menu id="simple-menu"
                anchorel={this.state.anchorEL}
                open={Boolean(this.state.anchorEL)} 
                onClose={this.handleClose}
                classes={{paper: classes.menu}}>
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

  //Logs the user out and redirects to the welcome page
  logOut = () => {
    localStorage.clear();
    window.location.replace("./welcome.html");
  }

  //Handles opening of the user menu by clicking the avatar
  handleOpen = (event) => {
    this.setState({ anchorEL: event.currentTarget });
  }

  //Handles closing the user menu
  handleClose = () => {
    this.setState({ anchorEL: null });
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div>
        <AppBar className={classNames(classes.appBar, this.state.open && classes.appBarShift)}>
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              aria-owns={'menu'}
              aria-haspopup="true"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" className={classes.appTitle} component="a" href="welcome.html">The Good Gaming Circuit</Typography>
            {this.checkLoginStatus()}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open} 
        >
          <div className={classes.drawerInner}>
            <div className={classes.drawerHeader}>
              <IconButton onClick={this.handleDrawerClose} className={classes.chevron}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <List><MailFolderListItems/></List>
          </div>
        </Drawer>
      </div>
    );
  }
}

DesktopAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DesktopAppBar);
