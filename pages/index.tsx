import { useState } from "react";
import axios from 'axios';
import { GetStaticProps } from "next";

import { Button, Htag, Rating, Tag, PTag } from "../components";
import { withLayout } from '../layout/Layout';
import { IMenuItem } from "../interfaces/menu.interface";

interface IHomeProps extends Record<string, unknown> {
  menu: Array<IMenuItem>;
  firstCategory: number;
}
 
function Home({ menu, firstCategory }: IHomeProps): JSX.Element {
  const [rating, setRating] = useState<number>(4);

  return (
    <>
      <Htag tag="h1">Текст</Htag>
      <Button appearance="primary" arrow="right" >Кнопка</Button>
      <Button appearance="ghost" arrow="down" >Кнопка</Button>
      <PTag size="l" >Большой</PTag>
      <PTag size="m" >Средний</PTag>
      <PTag size="s" >Маленький</PTag>
      <Tag size="s" >Маленький</Tag>
      <Tag size="m" color="red" >Маленький</Tag>
      <Tag size="s" color="ghost" >Маленький</Tag>
      <Tag color="green" >-10 000 ₽</Tag>
      <Rating rating={rating} isEditable setRating={setRating} />
      <ul>
        {menu.map((item) => (
          <li key={item._id.secondCategory} >{item._id.secondCategory}</li>
        ))}
      </ul>
    </>
  );
}

export default withLayout(Home);

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