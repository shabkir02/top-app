import { useState } from "react";

import { Button, Htag, Rating, Tag, PTag } from "../components";
import { withLayout } from '../layout/Layout';

function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(4)

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
    </>
  );
}

export default withLayout(Home);