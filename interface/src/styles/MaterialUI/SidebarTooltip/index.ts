import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

export const SidebarTooltip = withStyles({
  tooltip: {
    transition: 'var(--transition)',
    background: 'var(--color-primary)',
    marginLeft: '0px',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    color: 'var(--color-white)',
    fontSize: '13px',
    fontFamily: 'var(--font-family)',
    padding: '10px',
    fontWeight: 400,
    opacity: 1,
  },
})(Tooltip);

export default SidebarTooltip;
