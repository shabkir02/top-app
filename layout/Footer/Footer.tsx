import classNames from 'classnames';

import { IFooterProps } from './Footer.props';
import styles from './Header.module.css';

export const Footer = ({ ...props }: IFooterProps): JSX.Element => {
    return (
        <div {...props}>
            Footer
        </div>
    )
};