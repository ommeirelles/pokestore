export interface MapNameURLI {
    name: string;
    url: string;
}

export interface Ability {
    ability: MapNameURLI;
    is_hidden: boolean;
    slot: number;
}

export interface GameIndice {
    game_index: number;
    version: MapNameURLI;
}

export interface VersionDetail {
    rarity: number;
    version: MapNameURLI;
}

export interface HeldItem {
    item: MapNameURLI;
    version_details: VersionDetail[];
}

export interface VersionGroupDetail {
    level_learned_at: number;
    move_learn_method: MapNameURLI;
    version_group: MapNameURLI;
}

export interface Move {
    move: MapNameURLI;
    version_group_details: VersionGroupDetail[];
}

export interface Sprites {
    back_default: string;
    back_female?: any;
    back_shiny: string;
    back_shiny_female?: any;
    front_default: string;
    front_female?: any;
    front_shiny: string;
    front_shiny_female?: any;
}

export interface Stat {
    base_stat: number;
    effort: number;
    stat: MapNameURLI;
}

export interface TypeI {
    slot: number;
    type: MapNameURLI;
}

export interface PokemonI {
    abilities: Ability[];
    base_experience: number;
    forms: MapNameURLI[];
    game_indices: GameIndice[];
    height: number;
    held_items: HeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: Move[];
    name: string;
    order: number;
    species: MapNameURLI;
    sprites: Sprites;
    stats: Stat[];
    types: TypeI[];
    weight: number;
    price: number;
}

export interface TypesI {
    results: MapNameURLI[];
}

export interface Theme {
    mainColor: string;
    title: string;
    subTitle: string;
}
