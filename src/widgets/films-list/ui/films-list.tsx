import { CardScroll, Div, Title, Text } from "@vkontakte/vkui";
import { FilmCard } from "../../film-card";
import styles from './films-list.module.scss';
import { IFilm } from "../../../entities/film/model/models";

type IFilmsListProps = {
  title: string;
  films: IFilm[];
}

export function FilmsList(props: IFilmsListProps) {
  
  const { title, films } = props

  return (

  <Div className={styles.films_list}>
    <Title className={styles.films_list__title}>{title}</Title>
    {films.length > 0 ? 
      <CardScroll>
        {films?.map((movie) => <FilmCard key={movie.id} {...movie} />)}
      </CardScroll>
      :
      <Text className={styles.films_list__empty}>Empty for now ^^</Text>
    }
  </Div>

  );
}