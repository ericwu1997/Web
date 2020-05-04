import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Grid from 'material-ui/Grid';

const styles = theme => ({
    card: {
        width: '100%'
    },
    container: {
        marginTop: 100,
        marginBottom: 40,
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '70%'
        }
    },
    gridContainer: {
        marginTop: 20
    },
    header: {
        color: theme.palette.primary.contrastText
    },
    subheader: {
        color: theme.palette.primary.superLight,
        marginLeft: 6
    },
    text: {
        color: theme.palette.primary.superLight,
        marginLeft: 6
    },
    title: {
        color: theme.palette.primary.contrastText,
        marginTop: 100,
        textAlign: 'center'
    }, 
});

//Static page with contact info for Tye and Bryn
function ContactContent(props) {
    const { classes } = props;

    return(     
        <div className={classes.container}>
            <Typography variant="headline" className={classes.title}>Contact Us</Typography>
            <Grid container className={classes.gridContainer}>
                <Grid item sm={12} md={6} className={classes.card}>
                    <Card>
                        <CardHeader className={classes.header} title="Tye McKinnon"  subheader="CEO, Founder"
                            classes={{title: classes.header, subheader: classes.subheader}}/>
                        <CardContent>
                            <Typography className={classes.text}>tyme@ggvancity.com</Typography>
                            <Typography className={classes.text}>778-984-1284</Typography>       
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item sm={12} md={6} className={classes.card}>
                    <Card>
                        <CardHeader className={classes.header} title="Bryn Beaudry"  subheader="Lead Developer"
                            classes={{title: classes.header, subheader: classes.subheader}}/>
                        <CardContent>
                            <Typography className={classes.text}>babeaudry@gmail.com</Typography>
                            <Typography className={classes.text}>604-813-2502</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

ContactContent.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default withStyles(styles)(ContactContent);