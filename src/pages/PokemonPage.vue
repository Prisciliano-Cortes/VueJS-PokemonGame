<template>
    <h1 v-if="!poke">Loading...</h1>

    <div v-else>
        <h1> Who is this Pokémon? </h1>
    
        <PokemonPicture :pokemonId="poke.id" :showPokemon="showPokemon" />
        <PokemonOptions :pokemon="pokemonArr" @selection="checkAnswer" />
    </div>

    <template v-if="showAnswer">
        <h2 class="fade-in"> {{ message }} </h2>
    
        <button @click="newGame">
            New game
        </button>
    </template>
</template>

<script>
    import PokemonOptions from '@/components/PokemonOptions'
    import PokemonPicture from '@/components/PokemonPicture'
    import getPokemonOptions from '@/helpers/getPokemonOptions'

    export default {
        components: { 
            PokemonOptions, 
            PokemonPicture 
        },
        data() {
            return {
                pokemonArr: [],
                poke: null,
                showPokemon: false,
                showAnswer: false,
                message: ''
            }
        },
        methods: {
            async mixPokemonArray() {
                this.pokemonArr = await getPokemonOptions()

                const rndInt = Math.floor( Math.random() * 4)

                this.poke = this.pokemonArr[ rndInt ]
            },

            checkAnswer( selectedId ) {
                this.showPokemon = true
                this.showAnswer = true

                if ( selectedId === this.poke.id ) {
                    this.message = `Correct ${ this.poke.name }`
                } else {
                    this.message = `Ups, pokemon is ${ this.poke.name }`
                }
            },
            newGame() {
                this.pokemonArr = []
                this.showPokemon = false
                this.showAnswer = false
                this.message = ''

                this.poke = null
                this.mixPokemonArray()
            }
        },
        mounted() {
            this.mixPokemonArray()
        }
    }
</script>