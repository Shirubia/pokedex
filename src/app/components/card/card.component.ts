import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokemonService } from '../../shared/services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() pokemon!: Pokemon;

  constructor(private readonly pokeService: PokemonService) {}

  ngOnInit(): void {
    if (!this.pokemon.id) {
      console.error('Pokémon ID is missing!');
      return;
    }

    this.pokeService
      .getPokemon(this.pokemon.id)
      .pipe(take(1))
      .subscribe({
        next: (pokemon: Pokemon) => {
          if (pokemon) {
            this.pokemon.sprites = {
              ...this.pokemon.sprites, // keep existing properties if any
              ...pokemon.sprites, // merge with new sprites
            };

            this.pokemon.types = [...(pokemon.types || [])];
          }
        },
        error: (error) => {
          console.error('Failed to fetch Pokémon data:', error);
        },
      });
  }
}
