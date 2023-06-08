import getPokemonOptions, { getPokemon, getPokemonName } from "@/helpers/getPokemonOptions";

describe('GetPokemonOptions helpers', () => {

    test('It should return an array of numbers', () => {
        const poke = getPokemon()

        expect( poke.length ).toBe(650)
        expect( poke[0] ).toBe(1)
    })

    test('It should return a 4 element array with pokemon names', async() => {
        const poke = await getPokemonName([1,2,3,4])

        expect( poke ).toStrictEqual([
            { name: 'bulbasaur', id: 1 },
            { name: 'ivysaur', id: 2 },
            { name: 'venusaur', id: 3 },
            { name: 'charmander', id: 4 }
        ])
    })

    test('GetPokemonOptions It should return a mixed array', async() => {
        const poke = await getPokemonOptions()

        expect( poke.length ).toBe(4)

        expect( poke ).toEqual(
            [
                { 
                    name: expect.any(String), 
                    id: expect.any(Number)
                },
                { 
                    name: expect.any(String), 
                    id: expect.any(Number)
                },
                { 
                    name: expect.any(String), 
                    id: expect.any(Number)
                },
                { 
                    name: expect.any(String), 
                    id: expect.any(Number)
                }
            ]
        )
    })
})