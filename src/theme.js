import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#02cab9',
    },
    grey: {
      50: '#b6b6b6',
    },
  },
  typography: {
    h6: {
      color: '#484848',
      fontWeight: 400,
    },
    subtitle1: {
      color: '#484848',
      fontWeight: 400,
    },
    caption: {
      color: '#484848',
    },
  },
});
