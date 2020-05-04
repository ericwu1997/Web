import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormControl } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import request from '../login_request/request';
import { decodeJWT } from '../token_decode/decode';
import querystring from 'querystring';

//Post request to connect/token for login
function loginWithEmail (email, password) {
    return request({
        headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
        url : '/connect/token',
        method :'POST',
        data : querystring.stringify({
            response_type : 'code',
            grant_type : 'password',
            username: email,
            password: password
        })

    })
}

const styles = theme => ({
    container: {
        marginTop: 100,
        width: 360,
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        }
    },
    buttons: {
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    buttons2: {
        textAlign: 'center'
    },
    facebook: {
        width: 248,
        color: '#ffffff',
        background: '#3B5998',
        height: 40,
        paddingLeft: 10,
        fontSize: 14,
    },
    ficon: {
        height: 24,
        width: 24,
        marginRight: 24
    },
    gicon: {
        height: 18,
        width: 18,
        marginRight: 24
    },
    google: {
        width: 248,
        color: 'rgba(0, 0, 0, 0.54)',
        background: '#ffffff',
        height: 40,
        paddingLeft: 0,
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'bold',
    },
    title: {
        textAlign: 'center'
    },
    wideField: {
        width: '100%'
    },
});

//Allows a user to login using credentials existing in the API
class LoginContent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: {},
          username: '',
          password: '',
          open: false,
        };
    }

    //Sets username state to value from form
    handleUserName = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    //Sets password state to value from form
    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    //Opens login failed snackbar
    handleClick = () => {
        this.setState({ open: true });
    }

    //Closes login failed snackbar
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    
        this.setState({ open: false });
    }

    //Login with credentials entered, if failed snackbar with message will appear
    login = () => {
        //will log results.
        loginWithEmail(this.state.username, this.state.password).then(function(result) {
            console.log("Request successful");
            let decoded_token = decodeJWT(result.id_token);
            localStorage.setItem("user_id", decoded_token.sub);
            if(localStorage.getItem("urlHistory") === null){
                window.location.replace("./welcome.html");
            } else {
                window.location.replace("./" + localStorage.getItem("urlHistory"));
            }
        }).catch(error => {
            console.log(error);
            console.log("Request fail");
            this.handleClick();
            //Show error message when fail
        });
    }

    render() {
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <Typography variant="headline" className={classes.title}>Login</Typography>
                <form required>
                    <FormControl fullWidth>
                        <TextField 
                            required
                            id="email"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            InputLabelProps={{classename: classes.wideField}}
                            margin="normal"
                            onChange={this.handleUserName}/>
                        <TextField 
                            required
                            id="password"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            className={classes.wideField}
                            margin="normal"
                            onChange={this.handlePassword}/>
                    </FormControl>
                    <div className={classes.buttons}>
                        <Button onClick={() => this.login()}>Login</Button>
                        <Button href="signup.html">Sign Up</Button>
                    </div>
                    <div className={classes.buttons2}>
                        <Button variant="raised" className={classes.facebook}><img className={classes.ficon} src="https://www.freeiconspng.com/uploads/white-facebook-icon-png-like-us-on-facebook-to-stay-up-31.png"/>Sign in with Facebook</Button>
                    </div>
                    <div className={classes.buttons2}>
                       <Button variant="raised" className={classes.google}><img className={classes.gicon} src="https://cdn4.iconfinder.com/data/icons/new-google-logo-2015/400/new-google-favicon-512.png"/>Sign in with Google</Button>
                    </div>
                </form>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Login failed, check credentials</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }   
}

LoginContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(LoginContent);