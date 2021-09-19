import classNames from 'classnames';

import { IButtonProps } from './Button.props';

import styles from './Button.module.css';

export const Button = ({ appearance, children, arrow = 'none', className, ...props }: IButtonProps): JSX.Element => {

    const buttonClass = classNames(styles.button, className, {
        [styles.primary]: appearance === 'primary',
        [styles.ghost]: appearance === 'ghost',
    });

    const arrowClass = classNames(styles.arrow, {
        [styles.down]: arrow === 'down',
    });

    return (
        <button
            className={buttonClass}
            {...props}
        >
            {children}
            {arrow !== 'none' && (
                <span className={arrowClass}>
                    d
                </span>
            )}
        </button>
    );
};