
import axios from 'axios';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from 'querystring';
import { firstLevelMenu } from '../../helpers/helpers';
import { IMenuItem } from '../../interfaces/menu.interface';
import { withLayout } from '../../layout/Layout';

interface ITypeProps extends Record<string, unknown> {
  menu: Array<IMenuItem>;
  firstCategory: number;
}
 
function Type({ firstCategory }: ITypeProps): JSX.Element {

  return (
    <>
      Type: {firstCategory}
    </>
  );
}

export default withLayout(Type);

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: firstLevelMenu.map(m => '/' + m.route),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps<ITypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        }
    }
    const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type);
    if (!firstCategoryItem) {
        return {
            notFound: true
        }
    }
    const { data: menu }  = await axios.post<Array<IMenuItem>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory: firstCategoryItem.id
    });

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}