import classNames from 'classnames';

import { IPTagProps } from './PTag.props';
import styles from './PTag.module.css';

export const PTag = ({ size = 'm', children, className, ...props }: IPTagProps): JSX.Element => {

    const PTagClass = classNames(styles.p, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.l]: size === 'l'
    })

    return (
        <p 
            className={PTagClass} 
            {...props} 
        >{children}</p>
    )
};