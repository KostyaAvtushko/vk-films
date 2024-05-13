import { Link, createFileRoute } from '@tanstack/react-router'
import { Group, Panel, PanelHeader, Image, IconButton, Div, Text, PanelSpinner } from '@vkontakte/vkui';
import { TMDB_IMAGES_PATH, fetchFilm } from '../../shared';
import { useQueries } from '@tanstack/react-query';
import { FilmDescription } from '../../widgets/film-decription';
import { FilmRate } from '../../widgets/film-rate/ui/film-rate';
import styles from './film.module.scss';
import { Icon24ArrowLeftOutline } from '@vkontakte/icons';
import { fetchSimilarFilms } from '../../shared/api';
import { IFilm } from '../../entities/film/model/models';
import { FilmsList } from '../../widgets/films-list';
import { useRecentlyViewedStore } from '../../entities/film';
import { useEffect } from 'react';
import { ErrorPanel } from '../../widgets/error-panel';

export const Route = createFileRoute('/film/$id')({
  component: () => <Film/>
})

function Film() {
  const { id } = Route.useParams();

  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addRecentlyViewed);
  const recentlyViewed = useRecentlyViewedStore((state) => state.recentlyViewed);

  const results = useQueries({
    queries: [
      { 
        queryKey: ["films", id], 
        queryFn: () => fetchFilm(parseInt(id, 10))
      },
      { 
        queryKey: ["films"], 
        queryFn: () => fetchSimilarFilms(id)
      }
    ]
  });

  const isLoading = results.some(result => result.isLoading)
  const isSuccess = results.every(result => result.isSuccess)

  useEffect(() => {
    if (results[0].data &&  isSuccess && (recentlyViewed.length === 0 || recentlyViewed[0].id !== results[0].data.id)) {
      addRecentlyViewed(results[0]?.data);
    }
  }, [results, recentlyViewed, addRecentlyViewed, isSuccess]);

  if (isLoading) {
    return <PanelSpinner size="large"/>
  }
  

  return (
    <> 
      {isSuccess ?
        <Panel aria-busy={isLoading}>
          <PanelHeader className={styles.film_title}>
            {`${results[0].data?.title || ""} (${results[0].data?.original_title || ""})`}
          </PanelHeader>
          <Link to="/" className={styles.film_back}>
            <IconButton aria-label='back'>
              <Icon24ArrowLeftOutline />
            </IconButton>
          </Link>
          <Group 
            mode='plain'
            className={styles.film}
          >
            <Div className={styles.film__info}>
              <Image 
                src={TMDB_IMAGES_PATH + results[0].data?.poster_path} 
                alt={results[0].data?.title || ""}
                heightSize={450}
                widthSize={300}
              />
              <FilmDescription {...results[0]?.data || {} as IFilm}/>
              <FilmRate {...results[0]?.data || {} as IFilm}/>
            </Div>
            <Div className={styles.film__overview}> 
              <Text> 
                {results[0].data?.overview}
              </Text>
            </Div>
          </Group>
          <FilmsList title="Similar Films" films={results[1].data || []} />
        </Panel>
        :
        <ErrorPanel error="Server Error. May be you forget to set API key or turn on VPN"/>
      }
    </>
  );
}
