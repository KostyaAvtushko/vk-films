import { createFileRoute } from '@tanstack/react-router';
import { FilmsList } from '../widgets/films-list';
import { Panel, PanelSpinner } from '@vkontakte/vkui';
import { useQueries } from '@tanstack/react-query';
import { fetchPopularFilms, fetchTopRatedFilms } from '../shared';
import { useRecentlyViewedStore } from '../entities/film';

export const Route = createFileRoute('/')({
  component: App,
})
function App() {

  const recentlyViewed = useRecentlyViewedStore((state) => state.recentlyViewed)

  const results = useQueries({
    queries: [
      {
        queryKey: ["films", "popular"], 
        queryFn: () => fetchPopularFilms(1),
      },
      {
        queryKey: ["films", "top_rated"], 
        queryFn: () => fetchTopRatedFilms(1),
      }
    ]
  })


  const isLoading = results.some(result => result.isLoading)
  const isSuccess = results.every(result => result.isSuccess)

  if (isLoading) {
    return <PanelSpinner size="large"/>
  }

  return (
    isSuccess &&
    <Panel>
      <FilmsList title="Popular" films={results[0].data || []}/>
      <FilmsList title="Top Rated" films={results[1].data || []}/>
      <FilmsList title="Recently Viewed" films={recentlyViewed} />
    </Panel>
  )
}

export default App
