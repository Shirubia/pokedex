import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isLoading = true;
  pokemons: Pokemon[] | undefined;
  pokemonsCopy: Pokemon[] | undefined;
  searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly pokeService: PokemonService) {}

  ngOnInit(): void {
    this.pokeService
      .getPokemons()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pokemons: any) => {
          this.pokemons = pokemons.results.map(
            ({ name, url }: Pokemon, index: number) => {
              return { id: index + 1, name: name, url: url };
            },
          );
          this.pokemonsCopy = this.pokemons;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading Pokémon list!', error);
          this.isLoading = false;
        },
      });
    this.searchSubject.pipe(takeUntil(this.destroy$)).subscribe((search) => {
      if (search.length >= 2) {
        this.pokemons = this.pokemonsCopy?.filter(({ name }: Pokemon) => {
          return name.toLowerCase().includes(search);
        });
      } else {
        this.pokemons = this.pokemonsCopy;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  filter(event: any): void {
    const search: string = event.target.value.trim().toLowerCase();
    this.searchSubject.next(search);
  }
}
