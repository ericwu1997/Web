import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import EventDetails from './EventDetails';
import { Divider } from 'material-ui';

const styles = theme => ({
  card: {
    marginTop: 10,
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '60%',
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    }
  },
  date : {
    color: theme.palette.primary.contrastText,
    marginRight: '2vw',
    float : 'right',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  detail : {
    flex : 1
  },
  divider: {
    background: theme.palette.primary.contrastText,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,
    marginBottom: 20,
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    }
  },
  header : {
    marginTop: 40,
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 16
    }
  },
  text : {
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
  thumbnail: {
    width: '6vw',
    height: '6vw',
    margin: '0.5vw',
    [theme.breakpoints.down('sm')]: {
      width: '12vw',
      height: '12vw',
    },
  },
  title : {
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('md')]: {
      fontSize: 16
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 14
    }
  },
});

//Mock data for user profile page, displays list of events from api as the user's past events
class UserEvents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      test: 'Test',
      open: false,
      curEvent: '',
      imageUrl: '',
      gameDescription: '',
      title: ''
    };
  }

  componentDidMount() {
    fetch("http://ggcvan.bbeau.ca/api/Events")
      .then(response => response.json())
      .then(data =>{
        this.setState({ data });
      });
  }

  handleClickOpen = (index) => {
    var event = this.state.data[index];
    this.setState({ curEvent: event });
    this.setState({ imageUrl: event.game.imageUrl });
    this.setState({ gameDescription: event.game.gameDescription });
    this.setState({ title: event.game.title });
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  formatTime = (datetime) => {
    var date = new Date(datetime);
    return date.toLocaleString();
  }
  
  render() {
    const { classes, theme } = this.props;
    var events = this.state.data;
    var gameList = [];

    {Object.keys(events).map((item, index) => {
        gameList.push(
          <Card key={"event_" + index} className={classes.card}  onClick={() => this.handleClickOpen(index)}>
            <CardMedia className={classes.thumbnail} image={events[index].game.imageUrl} title={events[index].game.title}/>
            <CardContent className={classes.detail}>
                <Typography variant="headline" className={classes.title}>{events[index].title}</Typography>
                <Typography variant="body1" className={classes.text}>Attendees: {events[index].game.numberOfPlayers}</Typography>
                <Typography variant="body1" className={classes.text}>Location: {events[index].locationDescription}</Typography>
            </CardContent>
            <Typography variant="subheading" className={classes.date}>{this.formatTime(events[index].startTime)}</Typography>
          </Card>
        );
      }
    )}

    return (
      <div>
        <Typography variant="headline" className={classes.header}>Events Attended</Typography>
        <Divider className={classes.divider}/>
        {gameList}
        <EventDetails open={this.state.open} handleClose={this.handleClose} 
          curEvent={this.state.curEvent}
          imageUrl={this.state.imageUrl}
          gameDescription={this.state.gameDescription}
          title={this.state.title}/>
      </div>
    );
  }
}

UserEvents.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserEvents);