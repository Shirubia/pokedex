import { Component, Input, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Pokemon } from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  imgUrl: string | undefined;
  types: any[] | undefined;

  constructor(private readonly pokeService: PokemonService) {}

  ngOnInit(): void {
    this.pokeService
      .getPokemon(this.pokemon.id)
      .pipe(take(1))
      .subscribe((pokemon: any) => {
        if (pokemon) {
          this.imgUrl = pokemon.sprites.front_default;
          this.types = pokemon.types;
        }
      });
  }
}
