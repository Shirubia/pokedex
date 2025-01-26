import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Pokemon } from '../models/pokemon.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  getPokemons(): Observable<Pokemon> {
    return this.http.get<Pokemon>(environment.apiUrl + '/pokemon?limit=1025');
  }

  getPokemon(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(environment.apiUrl + '/pokemon/' + id);
  }
}
