import { Injectable } from '@angular/core';

export interface PokemonListResponse {
    results: PokemonResult[];
}

export interface PokemonResult {
    name: string;
    url: string;
}

export interface Pokemon {

    id: number;

    name: string;

    height: number;

    weight: number;

    base_experience: number;

    sprites: {
        front_default: string;
    };

    types: PokemonType[];

    abilities: PokemonAbility[];
}

export interface PokemonType {
    slot: number;

    type: {
        name: string;
    };
}

export interface PokemonAbility {

    ability: {
        name: string;
    };
}


@Injectable({
  providedIn: 'root',
})
export class PokemonModel {}
