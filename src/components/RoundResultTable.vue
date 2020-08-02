<template>
 <div class="round-result-table">
     <b-table :items="playerScores"></b-table>
 </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters([
            'getPlayers'
        ]),
        playerScores() {
            return this.getPlayers.map(player => {
                return {
                    name: player.username,
                    score: _.sum(player.scores)
                };
            });
        }
    }

};
</script>

<style>

</style>
