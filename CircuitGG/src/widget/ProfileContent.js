import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import UserEvents from './UserEvents';

const styles = theme => ({
    bio:{
        marginTop: 20,
    },
    container:{
        flexFrow:1,
        marginTop: 80,
        width: '40%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('md')]: {
            width: '50%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '70%',
        },
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        }
    },
    gamerScore:{
        marginTop: 4,
        marginLeft: 10,
        color: '#e5cb39',
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
            fontSize: 16
        }
    },
    media:{  
        height: 200,
        width: 200,
        marginRight: 16,
        [theme.breakpoints.down('xs')]: {
            height: 150,
            width: 150,
            marginRight: 0
        }
    },
    mostPlayed: {
        marginTop: 4,
        marginLeft: 10,
        color: theme.palette.primary.superLight,
        [theme.breakpoints.down('xs')]: {
            marginTop: 0,
            fontSize: 14
        }
    },
    profile: {
        display: 'flex'
    },
    text: {
        color: theme.palette.primary.superLight
    },
    userName: {
        fontSize: 32,
        [theme.breakpoints.down('xs')]: {
            fontSize: 18
        }
    },
});

//User profile with fields populated from a /api/user/{id} object
class UserProfile extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            data: {
                "pictureUrl": "https://cdn.iconscout.com/public/images/icon/premium/png-512/gamer-games-video-casino-372bcf114ef0140a-512x512.png"
            }
        };
    }

    //Retrieve the user object using the user id of the logged in user
    componentDidMount() {
        fetch("http://ggcvan.bbeau.ca/api/Users/" + localStorage.getItem("user_id"))
            .then(response => response.json())
            .then(data =>{
                this.setState({ data })
        });
    }
    
    render() {
        const {classes,theme} = this.props;
        var user = this.state.data;

        return (
            <div>
                <div className={classes.container}>
                    <Card className={classes.profile}>
                        <CardMedia 
                        className={classes.media}
                        image={user.pictureUrl}
                        title = "user image"/>
                        <CardContent>
                            <Typography 
                            className={classes.userName}>
                                {user.userName}
                            </Typography>
                            <Typography 
                                component="h2"
                                variant="body2"
                                className={classes.text}>
                                Gamer Score
                            </Typography>
                            <Typography
                                variant="headline"
                                className={classes.gamerScore}>
                                2030
                            </Typography>
                            <Typography 
                                component = "h2"
                                variant="body2"
                                className={classes.text}>
                                Most Played
                            </Typography>
                            <Typography
                                component="p"
                                variant="title"
                                className={classes.mostPlayed}>
                                Super Smash Bros.
                            </Typography>
                        </CardContent>              
                    </Card>  
                    <Card className={classes.bio}>
                        <CardHeader title="Biography"/>
                        <CardContent>
                            <Typography 
                                variant="body2"
                                component = "p"
                                className={classes.text}>
                                A biography, or simply bio, is a detailed description of a person's life. It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of his or her life, including intimate details of experience, and may include an analysis of the subject's personality.
                            </Typography>
                        </CardContent>
                    </Card>
                </div>     
                <UserEvents />
            </div>   
        );
    }
}

UserProfile.prototypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withStyles: true})(UserProfile);