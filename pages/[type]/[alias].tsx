
import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";

import { ParsedUrlQuery } from "querystring";

import { withLayout } from '../../layout/Layout';
import { IMenuItem } from '../../interfaces/menu.interface';
import { ITopPageModel, TopLevelCategory } from '../../interfaces/page.interface';
import { IProductModel } from '../../interfaces/product.interface';
import { firstLevelMenu } from "../../helpers/helpers";
import { TopPageComponent } from '../../page-components';

interface ITopPageProps extends Record<string, unknown> {
    menu: Array<IMenuItem>;
    firstCategory: TopLevelCategory;
    page: ITopPageModel;
    products: Array<IProductModel>;
}
 
function TopPage({ firstCategory, page, products }: ITopPageProps): JSX.Element {

    return (
        <TopPageComponent 
            firstCategory={firstCategory} 
            page={page}
            products={products}
        />
    );
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
    let paths: Array<string> = [];

    for (const m of firstLevelMenu) {
        const { data: menu } = await axios.post<Array<IMenuItem>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: m.id
        });

        paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
    }

    return {
        paths,
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
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

    try {
        const { data: menu }  = await axios.post<Array<IMenuItem>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
            firstCategory: firstCategoryItem.id
        });
    
        if (menu.length === 0) {
            return {
                notFound: true
            }
        }
        const { data: page }  = await axios.get<ITopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
        const { data: products }  = await axios.post<Array<IProductModel>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find/', {
            category: page.category,
            limit: 10
        });
    
        return {
            props: {
                page,
                firstCategory: firstCategoryItem.id,
                menu,
                products
            }
        };
    } catch(error) {
        return {
            notFound: true
        } 
    }
};