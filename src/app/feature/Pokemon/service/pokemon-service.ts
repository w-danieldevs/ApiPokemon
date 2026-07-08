import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon, PokemonListResponse } from '../model/pokemon-model';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {

private apiUrl = 'https://pokeapi.co/api/v2/pokemon';


constructor(private http: HttpClient) { }


buscarPokemon(nombre: string): Observable<Pokemon[]> {

  return this.http
    .get<Pokemon>(
      `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
    )
    .pipe(
      map(pokemon => [pokemon])
    );

}

getPokemons(offset:number):Observable<Pokemon[]>{

return this.http.get<PokemonListResponse>(
`${this.apiUrl}?limit=20&offset=${offset}`)

.pipe(

switchMap(response=>{

const requests=response.results.map(pokemon=>

this.http.get<Pokemon>(pokemon.url)

);

return forkJoin(requests);

})

);

}
}
