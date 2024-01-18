import { Component, OnInit } from '@angular/core';
import { take, takeUntil } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  pokemons: Pokemon[] | undefined;
  pokemonsCopy: Pokemon[] | undefined;
  constructor(private readonly pokeService: PokemonService) {}

  ngOnInit(): void {
    this.pokeService
      .getPokemons()
      .pipe(take(1))
      .subscribe((pokemons: any) => {
        this.pokemons = pokemons.results.map(
          ({ name, url }: Pokemon, index: number) => {
            return { id: index + 1, name: name, url: url };
          }
        );
        this.pokemonsCopy = this.pokemons;
      });
  }

  filter(event: any): void {
    const search: string = event.target.value;
    this.pokemons = this.pokemonsCopy?.filter(({ name }: Pokemon) => {
      return name.toLowerCase().includes(search.toLowerCase());
    });
  }
}
