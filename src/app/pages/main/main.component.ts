import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isLoading = true;
  pokemons: Pokemon[] | undefined;
  pokemonsCopy: Pokemon[] | undefined;

  constructor(private readonly pokeService: PokemonService) {}

  ngOnInit(): void {
    this.pokeService
      .getPokemons()
      .pipe(take(1))
      .subscribe({
        next: (pokemons: any) => {
          this.pokemons = pokemons.results.map(
            ({ name, url }: Pokemon, index: number) => {
              return { id: index + 1, name: name, url: url };
            }
          );
          this.pokemonsCopy = this.pokemons;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading Pokémon list!', error);
          this.isLoading = false;
        }
      });
  }

  filter(event: any): void {
    const search: string = event.target.value;
    this.pokemons = this.pokemonsCopy?.filter(({ name }: Pokemon) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
