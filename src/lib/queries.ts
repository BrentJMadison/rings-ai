import { gql } from '@apollo/client';

export const SEARCH_CHARACTERS = gql`
  query SearchCharacters($name: String!) {
    characters(filter: { name: $name }) {
      results {
        id
        name
        status
        species
        image
      }
    }
  }
`;

export interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  image: string;
}

export interface CharactersResponse {
  characters: {
    results: Character[];
  };
}
