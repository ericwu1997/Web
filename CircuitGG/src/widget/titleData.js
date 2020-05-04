import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import InfoIcon from 'material-ui-icons/Info';
import TodayIcon from 'material-ui-icons/Today';
import MailIcon from 'material-ui-icons/Mail';
import { withStyles } from 'material-ui/styles';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';

const styles = theme => ({
});

//Listitems containing all pages seen in the drawer/dropdown menu, with the page name, icon, and link
function MailFolderListItems(props) {
  const { classes } = props;

  return (
  <div>
    <ListItem button component="a" href="about.html">
      <ListItemIcon>
        <InfoIcon />
      </ListItemIcon>
      <ListItemText disableTypography primary={<Typography variant="subheading">About</Typography>}/>
    </ListItem>
    <ListItem button component="a" href="event.html">
      <ListItemIcon>
        <TodayIcon />
      </ListItemIcon>
      <ListItemText disableTypography primary={<Typography variant="subheading">Events</Typography>} />
    </ListItem>
    <ListItem button component="a" href="contact.html">
      <ListItemIcon>
        <MailIcon />
      </ListItemIcon>
      <ListItemText disableTypography primary={<Typography variant="subheading">Contact</Typography>} />
    </ListItem>
  </div>
  );
}

MailFolderListItems.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MailFolderListItems);