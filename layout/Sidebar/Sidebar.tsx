import classNames from 'classnames';

import { ISidebarProps } from './Sidebar.props';
import styles from './Sidebar.module.css';
import { Menu } from '../Menu/Menu';
import Logo from '../logo.svg';

export const Sidebar = ({ className, ...props }: ISidebarProps): JSX.Element => {
    return (
        <div className={classNames(className, styles.sidebar)} {...props}>
            <Logo className={styles.logo} />
            <div>Поиск</div>
            <Menu  />
        </div>
    )
};