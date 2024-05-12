import { ContentCard, Div, InfoRow, SimpleCell } from "@vkontakte/vkui";
import { IFilm } from "../../../entities/film/model/models";
import { TMDB_IMAGES_PATH } from "../../../shared";
import styles from './film-description.module.scss'

type IFilmDescription = Omit<IFilm, 'id' | 'title' | 'original_title' | 'overview' | 'poster_path' | 'vote_average' | 'vote_count'>

export function FilmDescription(props: IFilmDescription) {

  const { budget, origin_country, production_companies, original_language, genres } = props

  return (
    <Div>
      <SimpleDiscription header="Budget" text={`${budget}`} />
      <SimpleDiscription header="Country" text={origin_country?.join(', ') || ""} />
      <SimpleDiscription header="Language" text={original_language || ""} />
      {genres && 
        <SimpleDiscription header="Genres" text={genres?.map((e) => e.name).join(', ')} />
      }
      {production_companies &&
        <Div className={styles.film__companies}>
          {production_companies.map((company) => 
            <ContentCard
              key={crypto.randomUUID()}
              style={{ width: "100px" }}
              mode="tint"
              src={TMDB_IMAGES_PATH + company.logo_path}
              caption={company?.name || ""}
            />
          )}
        </Div>
      }
    </Div>
  )
}

function SimpleDiscription({ header, text }: { header: string, text: string }) {
  return (
    <SimpleCell>
      <InfoRow header={header}>{text}</InfoRow>
    </SimpleCell>
  )
}