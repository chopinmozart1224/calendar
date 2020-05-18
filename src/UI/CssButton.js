import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

export const CssButton = withStyles((theme) => ({
  root: {
    minWidth: theme.typography.pxToRem(44),
    minHeight: theme.typography.pxToRem(28),
    boxShadow: 'none',
    color: theme.palette.grey[50],
    borderColor: theme.palette.grey[50],
    '&:hover': {
      color: theme.palette.grey[50],
      borderColor: theme.palette.grey[50],
    },
    '&:active': {
      color: theme.palette.grey[50],
      borderColor: theme.palette.grey[50],
    },
    '&:focus': {
      color: theme.palette.primary.main,
      borderColor: theme.palette.primary.main,
    },
  },
}))(Button);
