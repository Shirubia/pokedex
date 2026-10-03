import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../../shared/models/pokemon.model';
import { PokemonService } from '../../shared/services/pokemon.service';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-main',
  imports: [CardComponent],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private readonly pokeService = inject(PokemonService);

  isLoading = true;
  pokemons: Pokemon[] = [];
  pokemonsCopy: Pokemon[] = [];
  searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.pokeService
      .getPokemons()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (pokemons: PokemonListResponse) => {
          this.pokemons = pokemons.results.map(
            ({ name, url }, index: number) => {
              return { id: index + 1, name, url };
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
        this.pokemons = this.pokemonsCopy.filter(({ name }) => {
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

  filter(event: Event): void {
    const target = event.target as HTMLInputElement | null;
    const search = (target?.value ?? '').trim().toLowerCase();
    this.searchSubject.next(search);
  }
}
