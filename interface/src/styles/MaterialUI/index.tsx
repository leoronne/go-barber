import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
  },
  tooltip: {
    fontSize: '13px',
    fontFamily: 'var(--font-family)',
    padding: '10px',
    fontWeight: 400,
    opacity: 1,
  },
  container: {
    height: 'calc(100% - 48px)',
  },
  dialogActions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectOptions: {
    '& ul': {
      backgroundColor: 'var(--menu-background)',
      color: 'var(--text-color)',
    },
    '& li': {
      fontSize: 14,
      fontFamily: 'var(--font-family) !important',
      '&:hover': {
        backgroundColor: 'var(--menu-hover)',
      },
    },
  },
  footerSelect: {
    '& li': {
      fontSize: 13,
    },
    '& svg': {
      fill: '#FAFAFA',
    },
  },
});

export { default as Select } from './Select';
export { default as TextField } from './TextField';
export { default as ButtonOutlined } from './ButtonOutlined';
export { default as ButtonFilled } from './ButtonFilled';
export { default as MenuContainer } from './MenuContainer';
export { default as StyledCheckbox } from './StyledCheckbox';
export { default as FormControl } from './FormControl';
export { default as InputLabel } from './InputLabel';
export { default as DialogTitle } from './DialogTitle';
export { default as DialogContentText } from './DialogContentText';
export { default as DialogActions } from './DialogActions';
export { default as SidebarTooltip } from './SidebarTooltip';
