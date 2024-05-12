import { Caption, Div, Text } from "@vkontakte/vkui";

export function FilmRate({vote_count, vote_average}: { vote_count: number, vote_average: number }) {

  return (
    <Div> 
      <Text 
        size={28} 
        weight="1"
        style={{ color: 
          vote_average > 6 ? "green" : "orange"
        }}
      >
        {vote_average}
      </Text>
      <Caption>{vote_count} votes</Caption>
    </Div>
  );
}