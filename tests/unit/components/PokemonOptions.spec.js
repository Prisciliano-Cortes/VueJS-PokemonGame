import { shallowMount } from "@vue/test-utils";
import PokemonOPtions from "@/components/PokemonOptions";
import { pokemonMock } from "../mocks/pokemon.mock";

describe("PokemonOptions component", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(PokemonOPtions, {
            props: {
                pokemon: pokemonMock,
            },
        });
    });

    test("You must match with the snapshot", () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    test("It should display all 4 options correctly", () => {
        const liTags = wrapper.findAll("li");

        expect( liTags.length ).toBe( pokemonMock.length );

        const list = liTags.map((wrp) => wrp.text());

        const listPokemon = pokemonMock.map(({ name }) => name);

        expect(list).toEqual(listPokemon);
    });

    test('It must emit "selection" with its respective parameters when clicking', () => {
        const [ li1, li2, li3, li4 ] = wrapper.findAll('li')

        li1.trigger('click')
        li2.trigger('click')
        li3.trigger('click')
        li4.trigger('click')

        const numEmits =  wrapper.emitted("selection").length

        expect(numEmits).toBe(4)

        for(let i = 0; i < numEmits; i++){
            expect(wrapper.emitted("selection")[i]).toEqual([pokemonMock[i].id])
        }
    });
});
