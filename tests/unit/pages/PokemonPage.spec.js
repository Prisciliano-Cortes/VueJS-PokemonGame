import { shallowMount, mount } from "@vue/test-utils"
import PokemonPage from "@/pages/PokemonPage";
import { pokemonMock } from "../mocks/pokemon.mock";

describe('PokemonPage component', () => {

    let wrapper;
    let mixPokemonArraySpy

    beforeEach( () => {
        mixPokemonArraySpy = jest.spyOn( PokemonPage.methods, 'mixPokemonArray' )

        wrapper = shallowMount( PokemonPage )
    })

    test('You must match the snapshot', () => {
        
        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('You must call mixPokemonArray when mounting', () => {

        expect( mixPokemonArraySpy ).toHaveBeenCalled()
    })

    test('It must match the snapshot when the pokemon load', () => {
        const wrapper = mount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemonMock,
                    poke: pokemonMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        expect( wrapper.html() ).toMatchSnapshot()
    })

    test('It should display the pokemonPicture and PokemonOptions components', () => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemonMock,
                    poke: pokemonMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        const picture = wrapper.find('pokemon-picture-stub')
        const options = wrapper.find('pokemon-options-stub')

        expect( picture.exists() ).toBeTruthy()
        expect( options.exists() ).toBeTruthy()

        expect( picture.attributes('pokemonid') ).toBe('1')

        expect( options.attributes('pokemon') ).toBeTruthy()
    })

    test('Test in checkAnswer', async() => {
        const wrapper = shallowMount(PokemonPage, {
            data() {
                return {
                    pokemonArr: pokemonMock,
                    poke: pokemonMock[0],
                    showPokemon: false,
                    showAnswer: false,
                    message: ''
                }
            }
        })

        await wrapper.vm.checkAnswer(1)

        expect( wrapper.find('h2').exists() ).toBeTruthy()

        expect( wrapper.vm.showPokemon ).toBe(true)

        expect( wrapper.find('h2').text() ).toBe(`Correct ${ pokemonMock[0].name }`)

        await wrapper.vm.checkAnswer(10)

        expect( wrapper.vm.message ).toBe(`Ups, pokemon is ${ pokemonMock[0].name }`)
    })
})