import classNames from 'classnames';

import { Card } from '../Card/Card';
import { IhhDataProps } from './HhData.props';
import styles from './HhData.module.css';

export const HhData = ({ count }: IhhDataProps): JSX.Element => {
    return (
        <div className={styles.hh}>
            <Card className={styles.count} >
                <div className={styles.title}>Всего вакансий</div>
                <div className={styles.countValue}>{count}</div>
            </Card>
        </div>
    )
};