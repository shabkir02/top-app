import { useState } from "react";
import axios from 'axios';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";

import { ParsedUrlQuery } from "querystring";

import { withLayout } from '../../layout/Layout';
import { IMenuItem } from '../../interfaces/menu.interface';
import { ITopPageModel } from '../../interfaces/page.interface';
import { IProductModel } from '../../interfaces/product.interface';

const firstCategory = 0;

interface ICourseProps extends Record<string, unknown> {
    menu: Array<IMenuItem>;
    firstCategory: number;
    page: ITopPageModel;
    products: Array<IProductModel>;
}
 
function Course({ menu, page, products }: ICourseProps): JSX.Element {

    return (
        <>
            {products && products.length}
        </>
    );
}

export default withLayout(Course);

export const getStaticPaths: GetStaticPaths = async () => {

    const { data: menu } = await axios.post<Array<IMenuItem>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });

    return {
        paths: menu.flatMap(m => m.pages.map(p => '/courses/' + p.alias)),
        fallback: true
    }
}

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
    if (!params) {
        return {
            notFound: true
        }
    }

    const { data: menu }  = await axios.post<Array<IMenuItem>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
        firstCategory
    });

    const { data: page }  = await axios.get<ITopPageModel>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias);
    const { data: products }  = await axios.post<Array<IProductModel>>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find/', {
        category: page.category,
        limit: 10
    });

    return {
        props: {
            page,
            firstCategory,
            menu,
            products
        }
    };
};