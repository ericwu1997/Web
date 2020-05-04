import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { FormGroup, FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { InputLabel } from 'material-ui/Input';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => ({
    button: {
        marginTop: 20
    },
    textField: {
        marginRight: 20,
        width: 200
    },
    wideField: {
        marginRight: 20,
        width: '60%'
    },
});

//transition for modal
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

//A modal containing a form for creating events
class CreateEvent extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: {}, //list of games
          game: ''  //selected game
        };
    }

    //Retrieve list of games
    componentDidMount() {
        fetch("http://ggcvan.bbeau.ca/api/Games")
          .then(response => response.json())
          .then(data =>{
            this.setState({ data })
        });
    }

    //handles changing the game selected
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    
    render() {
        const { classes } = this.props;
        var gameList = this.state.data;

        return(     
            <Dialog
                open={this.props.open}
                transition={Transition}
                keepMounted
                onClose={this.props.handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
                >
                <DialogContent>
                    <form required>
                        <FormGroup>
                            <TextField 
                                required
                                id="title"
                                label="Event Title"
                                className={classes.wideField}
                                margin="normal"
                                InputLabelProps={{classename: classes.textField}}/>
                        </FormGroup>
                        <FormControl className={classes.wideField}>
                            <InputLabel htmlFor="game">Game</InputLabel>
                            <Select 
                                required
                                value={this.state.game}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'game',
                                    id: 'game',
                                }}>
                                {Object.keys(gameList).map((index) => {
                                        return(
                                            <MenuItem className={classes.text} key={index} value={gameList[index].title}>{gameList[index].title}</MenuItem>
                                        )
                                    }   
                                )}
                            </Select>
                        </FormControl>
                        <FormGroup row>
                            <TextField
                                required 
                                id="startTime"
                                label="Start Time"
                                type="datetime-local"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"/>
                            <TextField 
                                required
                                id="endTime"
                                label="End Time"
                                type="datetime-local"
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                margin="normal"/>
                        </FormGroup>
                        <FormGroup row>
                            <TextField 
                                required
                                id="latitude"
                                label="Latitude"
                                type="number"
                                className={classes.textField}
                                margin="normal"/>
                            <TextField 
                                required
                                id="longitude"
                                label="Longitude"
                                type="number"
                                className={classes.textField}
                                margin="normal"/>
                        </FormGroup>
                        <FormGroup row>
                            <TextField 
                                required
                                id="locationDescription"
                                label="Location Description"
                                className={classes.textField}
                                margin="normal"/>
                            <TextField 
                                required
                                id="host"
                                label="Host"
                                className={classes.textField}
                                margin="normal"/>
                        </FormGroup>
                        <FormGroup>
                            <TextField 
                                required
                                id="eventDescription"
                                label="Event Description"
                                className={classes.wideField}
                                multiline
                                rows="3"
                                margin="normal"/>
                        </FormGroup>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button size="large" className={classes.button} onClick={this.props.handleClose}>Cancel</Button>
                    <Button size="large" className={classes.button} onClick={this.props.handleClose}>Create</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

CreateEvent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(CreateEvent);