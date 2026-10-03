import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly http = inject(HttpClient);


  getPokemons(): Observable<PokemonListResponse> {
    return this.http.get<PokemonListResponse>(environment.apiUrl + '/pokemon?limit=1025');
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(environment.apiUrl + '/pokemon/' + id);
  }
}
