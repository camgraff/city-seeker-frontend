<template>
    <component :is="displayComponent" :id="id" @startGame="isGameStarted = true"> </component>
</template>

<script>
import Lobby from './Lobby.vue';
import Play from './Play.vue';

export default {
    components: {
        Lobby,
        Play
    },
    data() {
        return {
            isGameStarted: false
        };
    },
    computed: {
        displayComponent() {
            if (this.isGameStarted) {
                return 'Play';
            }
            return 'Lobby';
        }
    },
    props: {
        id: {
            type: String,
            required: true
        }
    }
    
};
</script>

<style>

</style>
