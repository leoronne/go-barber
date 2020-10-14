import { Menu } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const MenuContainer = withStyles({
  paper: {
    top: '0 !important',
    marginTop: '45px',
    width: '350px',
    backgroundColor: 'var(--dark-grey)',
  },
  list: {
    padding: '10px',
    fontFamily: 'var(--font-family)',
    '& span, a': {
      fontSize: '14px !important',
      fontFamily: 'var(--font-family)',
      color: 'var(--text-color)',
    },
    '& li': {
      borderRadius: 'var(--border-radius)',
      padding: '10px',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
})(Menu);

export default MenuContainer;
