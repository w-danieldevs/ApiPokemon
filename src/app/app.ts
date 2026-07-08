import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from './feature/Pokemon/service/pokemon-service';
import { Pokemon } from './feature/Pokemon/model/pokemon-model';
import { Subject, switchMap, debounceTime, distinctUntilChanged, of } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {

  pokemons: Pokemon[] = [];

  offset=0;

buscarPokemon = new Subject<string>();

  cargando = true;

  error = '';

  constructor(
      private pokemonService: PokemonService,
      private cdr : ChangeDetectorRef,
  ){}

buscar(nombre: string): void {

  this.cargando = true;

  this.buscarPokemon.next(nombre);

}


 cargarPokemons(): void {

  this.cargando = true;

  this.pokemonService.getPokemons(this.offset).subscribe({

    next: data => {

      this.pokemons = data;

      this.cargando = false;

      this.cdr.detectChanges();

    },

    error: () => {

      this.error = 'No fue posible cargar los Pokémon';

      this.cargando = false;

    }

  });

}



ngOnInit(): void {

  this.cargarPokemons();

 this.buscarPokemon.pipe(

  debounceTime(1000),

  distinctUntilChanged(),

  switchMap(nombre => {

    nombre = nombre.trim().toLowerCase();

  if (nombre === '') {
    return this.pokemonService.getPokemons(this.offset);
  }

  if (nombre.length < 4) {
    return of([]); // No consulta la API todavía
  }

  

    return this.pokemonService.buscarPokemon(nombre);

  })

).subscribe({

  next: pokemons => {

    this.pokemons = pokemons;

    this.cargando = false;

    this.error = '';

    this.cdr.detectChanges();

  },

  error: () => {

    this.cargando = false;

    this.error = 'Pokémon no encontrado';

  }

});

}

siguiente(): void {

  this.offset += 20;

  this.cargarPokemons();

}

anterior(): void {

  if (this.offset >= 20) {

    this.offset -= 20;

    this.cargarPokemons();

  }

}

get paginaActual(): number {

  return this.offset / 20 + 1;

}
  
}
