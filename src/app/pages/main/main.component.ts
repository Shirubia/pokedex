import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import {
  Pokemon,
  PokemonListResponse,
} from '../../shared/models/pokemon.model';
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  isLoading = true;
  pokemons: Pokemon[] = [];
  pokemonsCopy: Pokemon[] = [];
  searchSubject = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  // Pagination
  currentPage = 1;
  totalPages = 1;
  limit = 24; // Number of Pokémon per page
  totalPokemons = 0;

  constructor(private readonly pokeService: PokemonService) {}

  ngOnInit(): void {
    this.fetchPokemons();

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

  fetchPokemons(): void {
    this.isLoading = true;
    const offset = (this.currentPage - 1) * this.limit;

    this.pokeService
      .getPokemons(this.limit, offset)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response: PokemonListResponse) => {
          this.pokemons = response.results.map(
            ({ name, url }: Pokemon, index: number) => {
              const id = offset + index + 1; // Calculate Pokémon ID based on offset
              return { id, name, url };
            },
          );
          this.pokemonsCopy = this.pokemons; // Keep an unfiltered copy for search
          this.totalPokemons = response.count;
          this.totalPages = Math.ceil(this.totalPokemons / this.limit);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading Pokémon list!', error);
          this.isLoading = false;
        },
      });
  }

  filter(event: any): void {
    const search: string = event.target.value.trim().toLowerCase();
    this.searchSubject.next(search);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchPokemons();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
