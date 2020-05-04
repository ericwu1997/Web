import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';

const styles = theme => ({
    container: {
        marginTop: 100,
        marginBottom: 40,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    button: {
        color: theme.palette.primary.contrastText,
        marginLeft: 'auto',
        marginRight: 20
    },
    divider: {
        background: theme.palette.primary.light,
        marginTop: 10,
        marginBottom: 10
    },
    header: {
        textAlign: 'center',
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.down('sm')]: {
            fontSize: 18
        }
    },
    media: {
        width: '100%',
        height: '15vw'
    },
    text: {
        color: theme.palette.primary.superLight,
        marginLeft: 20
    },
    title: {
        color: theme.palette.primary.contrastText,
        marginBottom: 16,
        [theme.breakpoints.down('sm')]: {
            fontSize: 16
        }
    },
});

//Tranistion for event details modal
function Transition(props) {
    return <Slide direction="up" {...props} />;
}
  
//A modal containing all details of an Event
class EventDetails extends React.Component {
    //Formats datetime from API to readable format
    formatTime = (datetime) => {
        var date = new Date(datetime);
        return date.toLocaleString();
    }

    eventDate = (startTime, endTime) => {
        return this.formatTime(startTime) + " - " + this.formatTime(endTime);
    }

    render() {
        const { classes, theme } = this.props;

        return(     
            <div className={classes.container}>
                <Dialog
                    open={this.props.open}
                    transition={Transition}
                    keepMounted
                    onClose={this.props.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    onClick={this.props.handleClose}>
                    <DialogContent>  
                    <CardHeader className={classes.header} title={this.props.curEvent.title} 
                        subheader={this.eventDate(this.props.curEvent.startTime, this.props.curEvent.endTime)}
                        classes={{title: classes.header, subheader: classes.header}}/>
                    <CardMedia className={classes.media} title="gameImage" image={this.props.imageUrl}/>
                    <CardContent>
                        <Typography variant="title" className={classes.title}>Description</Typography>
                        <Typography className={classes.text}>{this.props.gameDescription}</Typography>
                        <Divider className={classes.divider}/>
                        <Typography variant="title" className={classes.title}>Info</Typography>
                        <Grid container>
                            <Grid item xs={6}>
                                <Typography className={classes.text}>Game: {this.props.title}</Typography>
                                <Typography className={classes.text}>Host: {this.props.curEvent.host}</Typography>
                                <Typography className={classes.text}>Creator: {this.props.curEvent.creator}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography className={classes.text}>Location: {this.props.curEvent.locationDescription}</Typography>
                                <Typography className={classes.text}>Latitude: {this.props.curEvent.latitude}</Typography>
                                <Typography className={classes.text}>Longitude: {this.props.curEvent.longitude}</Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.divider}/>
                        <Typography variant="title" className={classes.title}>Attendees</Typography>
                        <Grid container>
                            <Grid item md={3} sm={4}>
                                <Typography className={classes.text}>username1</Typography>
                                <Typography className={classes.text}>user2</Typography>
                                <Typography className={classes.text}>user3</Typography>
                            </Grid>
                            <Grid item md={3} sm={4}>
                                <Typography className={classes.text}>user4</Typography>
                                <Typography className={classes.text}>username5</Typography>
                                <Typography className={classes.text}>user6</Typography>
                            </Grid>
                            <Grid item md={3} sm={4}>
                                <Typography className={classes.text}>username7</Typography>
                                <Typography className={classes.text}>username8</Typography>
                                <Typography className={classes.text}>username9</Typography>
                            </Grid>
                            <Grid item md={3} sm={4}>
                                <Typography className={classes.text}>user10</Typography>
                                <Typography className={classes.text}>user11</Typography>
                                <Typography className={classes.text}>user12</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    </DialogContent>
                    <DialogActions>
                        <Button size="large" className={classes.button}>Register</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

EventDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(EventDetails);