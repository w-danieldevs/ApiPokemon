import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonListResponse } from '../model/pokemon-model';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

private apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0';


constructor(private http: HttpClient) { }

getPokemons(): Observable<Pokemon[]> {
  return this.http.get<PokemonListResponse>(this.apiUrl).pipe(switchMap(respuesta => {
    const peticiones = respuesta.results.map(pokemon => this.http.get<Pokemon>(pokemon.url)
  );
  return forkJoin(peticiones);
  }),
  map(datos => datos)
);

}
}
