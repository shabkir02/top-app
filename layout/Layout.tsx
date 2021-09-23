import { FC } from 'react';
import classNames from 'classnames';

import { ILayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';

import styles from './Layout.module.css';

const Layout = ({ children }: ILayoutProps): JSX.Element => {
    return (
        <div className={styles.wrapper} >
            <Header className={styles.header} />
            <Sidebar className={styles.sidebar} />
            <div className={styles.body}>
                {children}
            </div>
            <Footer className={styles.footer} />
        </div>
    )
};

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>) => {
    return function withLayoutComponent(props: T): JSX.Element {
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      )
    }
  }