import { createMuiTheme } from 'material-ui/styles';

const MainTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#212121',
            light: '#484848',
            superLight: '#a0a0a0',
            dark: '#000000',
            contrastText: '#ffffff'
        },
        secondary: {
            main: '#212121',
            light: '#484848',
            dark: '#000000',
            contrastText: '#ffffff'
        },
        background: {
            paper: '#212121',
        },
        type: 'dark'
    },
});

export default MainTheme