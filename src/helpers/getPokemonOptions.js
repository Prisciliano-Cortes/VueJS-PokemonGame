import pokemonApi from "@/api/pokemonApi"

export const getPokemon = () => {
    const pokemonArr = Array.from( Array(650) )

    return pokemonArr.map( ( _, index) => index + 1 )

}

export const getPokemonName = async( pokemon = [] ) => {

    const promise = pokemon.map((id) => {
        return pokemonApi.get(`/${id}`);
    });
     
    const res = await Promise.all(promise);
     
    const returnRes = res.map((poke) => {
        return {
            name: poke.data.name,
            id: poke.data.id,
        };
    });
    
    return returnRes;
}

const getPokemonOptions = async() => {
    const mixedPokemon = getPokemon().sort( () => Math.random() - 0.5 )

    const pokemon = await getPokemonName( mixedPokemon.splice(0,4) )
    
    return pokemon
}


export default getPokemonOptions