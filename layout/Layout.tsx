import { FC } from 'react';
import classNames from 'classnames';

import { ILayoutProps } from './Layout.props';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import { Sidebar } from './Sidebar/Sidebar';

import styles from './Layout.module.css';

const Layout = ({ children }: ILayoutProps): JSX.Element => {
    return (
        <>
            <Header/>
            <div>
                <Sidebar />
                <div>
                    {children}
                </div>
            </div>
            <Footer />
        </>
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