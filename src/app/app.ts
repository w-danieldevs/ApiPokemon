import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PokemonService } from './feature/Pokemon/service/pokemon-service';
import { Pokemon } from './feature/Pokemon/model/pokemon-model';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App implements OnInit {

  pokemons: Pokemon[] = [];



  cargando = true;

  error = '';

  constructor(
      private pokemonService: PokemonService,
      private cdr : ChangeDetectorRef,
  ){}

  ngOnInit(): void {

      this.pokemonService.getPokemons().subscribe({

          next: data =>{

              this.pokemons = data;

              this.cargando = false;

              this.cdr.detectChanges();

          },

          error: ()=>{

              this.error = 'No fue posible cargar los Pokémon';

              this.cargando = false;

          }

      });

  }
  
}
