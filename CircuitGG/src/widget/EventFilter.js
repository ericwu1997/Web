import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia, CardHeader } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import EventDetails from './EventDetails';
import CreateEvent from './CreateEvent'
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import { ListItemText } from 'material-ui/List';
import Select from 'material-ui/Select';
import Chip from 'material-ui/Chip';

//Transition for event filter modal
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

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
    chip: {
        margin: theme.spacing.unit / 2,
        background: theme.palette.primary.main
    },
    chipholder : {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '70%',
        }
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    createBtn : {
        marginRight: 10,
        marginBottom: 10,
        float: 'right'
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
    filter : {
        width: '60%',
        marginLeft: 'auto',
        marginRight: 'auto',
        [theme.breakpoints.down('xs')]: {
            width: '90%',
        }
    },
    filterBtn : {
       marginRight: 10,
       marginBottom: 10
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: '100%',
    },
    padding : {
        marginTop: 80,
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
});

const ITEM_HEIGHT = 50;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

//Event page, lists all events from the API, includes a filter to filter by games
class EventFilter extends React.Component {
    state = {
        open: false,
        gamedata: {},
        allEvent: {},
        detailOpen: false,
        detailTitle: 'NULL',
        createOpen: false,
        detailImgUrl: 'NULL',
        gameDescription: 'NULL',
        curEvent: '',
        filterEvent: [],
        title : [],
        category : [],
        platform : [],
        genre : []
    };
    
    //Retrieves list of games and events
    componentDidMount() {
        fetch("http://ggcvan.bbeau.ca/api/Games")
            .then(response => response.json())
            .then(gamedata =>{
                this.setState({ gamedata })
        });
        fetch("http://ggcvan.bbeau.ca/api/Events")
            .then(response => response.json())
            .then(allEvent =>{
                this.setState({ allEvent })
                this.setState({ filterEvent : allEvent })
        });
        this.setState({ filterEvent :  Object.values(this.state.allEvent)})
    }

    //No filters currently selected
    ifNoFilterAdded = () => {
        var state = this.state;
        if(state.title.length == 0
            && state.category.length == 0
            && state.platform.length == 0
            && state.genre.length == 0){
                return 1
            } else {
                return 0
            }
    }

    //Handles change in filters
    handleChange = (filter, event) => {
         this.setState({ [filter]: event.target.value });
    }

    //Handles removal of a filter by clicking the x on the filter chips
    handleDelete = (filterType, data) => () => {
        var tmp = [];

        const filter = [...this.state[filterType]];
        const chipToDelete = filter.indexOf(data);
        filter.splice(chipToDelete, 1);

        this.setState({ [filterType] : filter }, function () {
           
            var filter_title = this.state.title;
    
            if(this.ifNoFilterAdded()){
                this.setState({ filterEvent : Object.values(this.state.allEvent)})
            } else {
                this.state.allEvent.map((item, i) => {
                    filter_title.map((title) => {
                        if(item.game.title == title){
                            tmp.push(item);
                        }
                    })
                })
                this.setState({ filterEvent : tmp   })
            }

        });
    }

    //Opens filter modal
    handleClickOpen = () => {
        this.setState({ open: true });
    }

    //Closes filter modal and filters the events
    handleClose = () => {
        var tmp = [];
        var filter_title = this.state.title;

        this.state.allEvent.map((item, i) => {
            filter_title.map((title) => {
                if(item.game.title == title){
                    tmp.push(item);
                }
            })
        })
        
        if(!this.ifNoFilterAdded()) {
            this.setState({ filterEvent : tmp   })
        }
        this.setState({ open : false });
    }

    //Clears all filters
    handleClearAllClose = () => {
        var tmp = [];

        this.setState({ title : tmp });
        this.setState({ category : tmp });
        this.setState({ platform : tmp });
        this.setState({ genre : tmp });
        this.setState({ filterEvent : Object.values(this.state.allEvent) });
        this.setState({ open : false });
    }

    //Opens event details modal for the clicked event
    handleDetailClickOpen = (index) => {
        var event = this.state.filterEvent[index];
        this.setState({ curEvent: event });
        this.setState({ detailImageUrl: event.game.imageUrl });
        this.setState({ gameDescription: event.game.gameDescription });
        this.setState({ detailTitle: event.game.title });
        this.setState({ detailOpen: true });
    }

    //Closes event details modal
    handleDetailClose = () => {
        this.setState({ detailOpen: false });
    }

    //Opens create event modal
    handleCreateClickOpen = () => {
        this.setState({ createOpen: true });
    }

    //Opens create event modal
    handleCreateClose = () => {
        this.setState({ createOpen: false });
    }

    render() {
        const { classes, theme } = this.props;
        const gameList = this.state.gamedata;
        const filterType = ["title", "platform", "genre", "category"];
        
        return (
            <div>
                <Card key="event_padding" className={classes.padding}></Card>
                <div className={classes.filter}>
                    <Button variant="raised" color="primary" className={classes.filterBtn} onClick={this.handleClickOpen}>Filter &#9660;</Button>
                    <Button variant="raised" color="primary" onClick={this.handleClearAllClose} className={classes.filterBtn}>Clear ALL</Button>
                    <Button variant="raised" className={classes.createBtn} onClick={this.handleCreateClickOpen}>Create</Button>
                </div>
                <div className={classes.chipholder}>
                    {
                        this.state.title.map((item) => (
                            <Chip
                            key={item}
                            label={item}
                            onDelete={this.handleDelete("title", item)}
                            className={classes.chip}
                            />
                        ))
                    }
                </div>
                <div>
                    {this.state.filterEvent.map((item, i) => {
                            return (
                                <Card key={"event_" + i} className={classes.card} onClick={() => this.handleDetailClickOpen(i)}>
                                    <CardMedia className={classes.thumbnail} image={item.game.imageUrl} title={item.game.title}/>
                                    <CardContent className={classes.detail}>
                                        <Typography variant="headline" className={classes.text}>{item.title}</Typography>
                                        <Typography variant="body1" className={classes.text}>Attendees: {item.game.numberOfPlayers}</Typography>
                                        <Typography variant="body1" className={classes.text}>Location: {item.locationDescription}</Typography>
                                    </CardContent>
                                    <Typography variant="subheading" className={classes.date}>{item.startTime}</Typography>
                                </Card>
                            )
                        }
                    )}
                </div>
                <Dialog
                    disableBackdropClick
                    disableEscapeKeyDown
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <DialogContent>
                        <form className={classes.container}>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Game</InputLabel>
                                <Select
                                    multiple
                                    value={this.state.title}
                                    onChange={(e) => this.handleChange("title", e)}
                                    input={<Input id="select-multiple" />}
                                    MenuProps={MenuProps}>
                                    {Object.keys(gameList).map((item, index) => {
                                        return(
                                            <MenuItem
                                                key={item}
                                                value={gameList[index].title}
                                                style={{
                                                    fontWeight:
                                                        this.state.title.indexOf(item) === -1
                                                        ? theme.typography.fontWeightRegular
                                                        : theme.typography.fontWeightMedium,
                                                }}>
                                                {gameList[index].title}
                                            </MenuItem>)
                                        }
                                    )}
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Genre</InputLabel>
                                <Select
                                    multiple
                                    value="XXX"
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple" />}
                                    MenuProps={MenuProps}>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Platform</InputLabel>
                                <Select
                                    multiple
                                    value="XXX"
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple" />}
                                    MenuProps={MenuProps}>
                                </Select>
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    multiple
                                    value="XXX"
                                    onChange={this.handleChange}
                                    input={<Input id="select-multiple" />}
                                    MenuProps={MenuProps}>
                                </Select>
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClearAllClose} className={classes.text}>Clear ALL</Button>
                        <Button onClick={this.handleClose} className={classes.text}>Ok</Button>
                    </DialogActions>
                </Dialog>
                <EventDetails open={this.state.detailOpen} handleClose={this.handleDetailClose} 
                    curEvent={this.state.curEvent}
                    imageUrl={this.state.detailImageUrl}
                    gameDescription={this.state.gameDescription}
                    title={this.state.detailTitle}/>
                <CreateEvent open={this.state.createOpen} handleClose={this.handleCreateClose} />
            </div>
        );
    }
}

EventFilter.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(EventFilter);