import pokemonApi from "@/api/pokemonApi"

describe('PokemonApi', () => {

    test('Axios must be configured with the pokemon api', () => {
        
        expect( pokemonApi.defaults.baseURL ).toBe('https://pokeapi.co/api/v2/pokemon')
    })
})