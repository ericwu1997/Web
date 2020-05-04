import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

const styles = theme => ({
    container: {
        marginTop: 100,
        marginBottom: 40,
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '60%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '70%'
        }
    },
    text: {
        color: theme.palette.primary.superLight
    },
    title: {
        color: theme.palette.primary.contrastText,
        textAlign: 'center',
        marginBottom: 40
    },
});

//static page describing the Good Gaming Circuit
function AboutContent(props) {
    const { classes } = props;

    return(
        <div className={classes.container}>
            <Typography variant='headline' className={classes.title}>The Good Gaming Circuit</Typography>
            <Typography className={classes.text}>
                The Good Gaming Circuit (GGC) is a community focused organization that helps event hosts, tournament organizers, players and venues promote, produce and organize live gaming events specific to each genre, platform and location.
            </Typography>
            <br />
            <Typography className={classes.text}>
                Event listings are free and open to the public, we aim to create beer leagues, all ages, casual and competitive rankings for our partnered events featuring both retro classics and modern videogames in addition to tabletop, boardgames as well as traditional analog games such as foosball and ping pong.
            </Typography>
            <br />
            <Typography className={classes.text}>
                The GGC is made for and by passionate gamers who want to see bigger and better events in their region as well as promoting barcraft nights and producing content catered to each gaming community. If you feel like you want to become the next big event host in your area, then reach out to us and we can help with promotion, logistics and hardware.
            </Typography>
            <br />
            <Typography className={classes.text}>
                We are committed to giving back to the communities we live and play in and are committed to producing free low barrier events and creating employment opportunities while advocating for scholarships and support for aspiring content creators, competitors and engaging the general public to evoke their nostalgia and love for games of all sort. 
            </Typography>
        </div>
    );
}

AboutContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(AboutContent);