
import axios from 'axios';
import { GetStaticProps } from "next";

import { withLayout } from '../layout/Layout';
import { IMenuItem } from "../interfaces/menu.interface";

interface IHomeProps extends Record<string, unknown> {
  menu: Array<IMenuItem>;
  firstCategory: number;
}
 
function Search(): JSX.Element {

  return (
    <>
      
    </>
  );
}

export default withLayout(Search);

export const getStaticProps: GetStaticProps = async () => {

  const firstCategory = 0;
  const { data: menu }  = await axios.post<Array<IMenuItem>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  });

  return {
    props: {
      menu,
      firstCategory
    }
  }
}