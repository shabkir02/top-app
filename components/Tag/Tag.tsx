import { ITagProps } from './Tag.props';

import styles from './Tag.module.css';
import classNames from 'classnames';

export const Tag = ({ size = 's', children, color = 'ghost', className, href, ...props }: ITagProps): JSX.Element => {

    const TagClass = classNames(styles.tag, {
        [styles.s]: size === 's',
        [styles.m]: size === 'm',
        [styles.ghost]: color === 'ghost',
        [styles.red]: color === 'red',
        [styles.gray]: color === 'gray',
        [styles.green]: color === 'green',
        [styles.primary]: color === 'primary',
    })

    return (
        <div 
            className={TagClass} 
            {...props} 
        >{
            href 
            ? <a href={href} >{children}</a>
            : <>{children}</>
        }
        </div>
    )
};