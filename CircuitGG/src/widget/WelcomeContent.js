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
    textAlign: 'center',
    color: theme.palette.primary.contrastText,
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
  welcome : {
    background: theme.palette.primary.dark,
    marginTop: 80,
    marginBottom: 60,
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down('sm')]: {
      width: '60%',
    },
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    }
  },
});

//Welcome page content, contains a blurb about the Good Gaming Circuit, and the list of events from /api/events
class WelcomeContent extends React.Component {
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

  //Retrieves events
  componentDidMount() {
    fetch("http://ggcvan.bbeau.ca/api/Events")
      .then(response => response.json())
      .then(data =>{
        this.setState({ data });
      });
  }

  //Click to open event details modal
  handleClickOpen = (index) => {
    var event = this.state.data[index];
    this.setState({ curEvent: event });
    this.setState({ imageUrl: event.game.imageUrl });
    this.setState({ gameDescription: event.game.gameDescription });
    this.setState({ title: event.game.title });
    this.setState({ open: true });
  }

  //Closes event details modal
  handleClose = () => {
    this.setState({ open: false });
  }

  //Formats datetime from API to readable format
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
        <Card className={classes.welcome}>
        <CardHeader title="Welcome to the Good Gaming Circuit"
            classes={{title: classes.header}}/>
            <CardContent className={classes.detail}>
                <Typography variant="headline" className={classes.title}></Typography>
                <Typography variant="body1" className={classes.text}>The Good Gaming Circuit (GGC) is a community focused organization that helps event hosts, tournament organizers, players and venues promote, produce and organize live gaming events specific to each genre, platform and location.</Typography>
            </CardContent>
        </Card>
        <Typography variant="headline" className={classes.header}>Featured Events</Typography>
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

WelcomeContent.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(WelcomeContent);