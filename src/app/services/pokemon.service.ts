import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  constructor(private readonly http: HttpClient) {}

  getPokemons(): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/pokemon?limit=151');
  }

  getPokemon(id: number): Observable<any> {
    return this.http.get<any>(environment.apiUrl + '/pokemon/' + id);
  }
}
