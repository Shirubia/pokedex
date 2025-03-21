export enum PokemonTypeName {
  Normal = 'normal',
  Fire = 'fire',
  Water = 'water',
  Electric = 'electric',
  Grass = 'grass',
  Ice = 'ice',
  Fighting = 'fighting',
  Poison = 'poison',
  Ground = 'ground',
  Flying = 'flying',
  Psychic = 'psychic',
  Bug = 'bug',
  Rock = 'rock',
  Ghost = 'ghost',
  Dragon = 'dragon',
  Dark = 'dark',
  Steel = 'steel',
  Fairy = 'fairy',
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: PokemonSprites;
  types?: PokemonType[];
  height?: number;
  weight?: number;
  order?: number;
}

export interface PokemonSprites {
  front_default?: string;
  front_shiny?: string;
  back_default?: string;
  back_shiny?: string;
  front_female?: string;
  front_shiny_female?: string;
  back_female?: string;
  back_shiny_female?: string;
}

export interface PokemonType {
  type: {
    name: PokemonTypeName;
    url?: string;
  };
}

// Define a response type for the Pokémon list API
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}
