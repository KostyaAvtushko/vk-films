import { Card, ContentCard } from "@vkontakte/vkui";
import { GENRES as genres } from "../../../shared";
import { Link } from "@tanstack/react-router";
import { IFilm } from "../../../entities/film/model/models";

export function FilmCard(props: IFilm) {

  const { id, title, poster_path, vote_average, vote_count, genre_ids, adult } = props;

  return (
    <Card style={{ width: "fit-content" }}>
      <Link 
        to="/film/$id" 
        params={{ id: id }} 
        style={{ textDecoration: "none"}}
      >
        <ContentCard
          style={{ width: "180px" }}
          src={"https://image.tmdb.org/t/p/w300" + poster_path}
          alt={title}
          subtitle={`${vote_average}/10 (${vote_count} votes)`}
          header={title}
          text={genre_ids ? genres[genre_ids[0] as keyof typeof genres] : ''}
          caption={adult ? "Adult only" : "All age"}
          mode="tint"
        />
      </Link>
    </Card>
  )
}