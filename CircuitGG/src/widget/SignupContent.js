import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, typography } from 'material-ui/styles';
import { FormGroup, FormControl } from 'material-ui/Form';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
 
const styles = theme => ({
    buttons: {
        marginTop: 20,
        textAlign: 'center'
    },
    container: {
        marginTop: 100,
        width: '25%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '40%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '60%'
        },
        [theme.breakpoints.down('xs')]: {
            width: '80%'
        }
    },
    title: {
        textAlign: 'center'
    },
    wideField: {
        width: '100%'
    }, 
});

//Form for registering a user to /api/register
class SignupContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email:'',
            username:'',
            password:{
                password : '',
                repeatPassword:''
            },
            responseMsg: '',
            open: false,
        };
    }
 
    //Password and confirmation password must match
    componentWillMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.password.password) {
                return false;
            }
            return true;
        });
    }

    //Sets email state to value from form
    handleChangeEmail = (event) => {
        const email = event.target.value;
        this.setState({ email });

    }

    //Sets username state to value from form
    handleChangeUserName = (event) =>{
        const username = event.target.value;
        this.setState({username});
    }

    //Sets password state to value from form
    handleChangePWD = (event) => {
        const { password } = this.state;
        password[event.target.name] = event.target.value;
        this.setState({ password });
    }

    //Opens snackbar with message regarding signup success/fail
    handleClick = () => {
        this.setState({ open: true });
    }

    //Closes snackbar
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    }

    //Post request to /api/register with user details from form
    handleSubmit = (event) => {
        event.preventDefault(); 

        var userinfo =[this.state.email,this.state.username, this.state.password.password];

        console.log('component state', JSON.stringify(userinfo));             
        fetch('http://ggcvan.bbeau.ca/api/register',{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email" : this.state.email,
                "userName" : this.state.username,
                "password" : this.state.password.password,
            })
        }).then(response =>{
            if(response.ok){
                response.text().then(text => {
                    console.log("data ok",text);
                    this.setState({responseMsg: "Account successfully created"});
                    this.setState({email: ''});
                    this.setState({username: ''});
                    this.setState({password: {password:'', repeatPassword: ''}});
                    this.handleClick();
                });
           } else{
                response.text().then(text => {
                    console.log("data is not ok",text);
                    if (text.indexOf("DuplicateUserName") >= 0) {
                        this.setState({responseMsg: "Username in use"});
                    } else {
                        this.setState({responseMsg: "Could not create account"});
                    }
                    this.handleClick();
                });
           }
        });
    }
 
    render() {
        const { classes } = this.props;
        const { password } = this.state;
        const { email } = this.state;
        const {username} = this.state;

        return (
            <div className={classes.container}>
                <Typography variant="headline" className={classes.title}>Sign Up</Typography>
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}>
                    <FormControl fullWidth>
                        <TextValidator
                            required
                            onChange={this.handleChangeEmail}
                            name="email"
                            label="Email"
                            value={email}
                            validators={['required', 'isEmail']}
                            errorMessages={['this field is required', 'email is not valid']}/>
                        <TextValidator
                            required
                            label="User Name"
                            onChange={this.handleChangeUserName}
                            name="username"
                            value={username}
                            errorMessages={['this field is required', 'username is not valid']}/>
                        <TextValidator
                            required
                            label="Password"
                            onChange={this.handleChangePWD}
                            name="password"
                            type="password"
                            validators={['required','matchRegexp:^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9]{6,}$']}// change regex
                            errorMessages={['this field is required', 'password must be at least 6 characters, alphanumeric']}
                            value={password.password}/>
                        <TextValidator
                            required
                            label="Confirm password"
                            onChange={this.handleChangePWD}
                            name="repeatPassword"
                            type="password"
                            validators={['isPasswordMatch', 'required']}
                            errorMessages={['password mismatch', 'this field is required']}
                            value={password.repeatPassword}/>
                        <div className={classes.buttons}>
                            <Button type="submit">Sign Up</Button>
                        </div>
                    </FormControl>                       
                </ValidatorForm>
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
                    message={<span id="message-id">{this.state.responseMsg}</span>}
                    action={[
                        <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={this.handleClose}
                        >
                        <CloseIcon />
                        </IconButton>,
                    ]}/>
            </div>
        );
    }
}

SignupContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(SignupContent);