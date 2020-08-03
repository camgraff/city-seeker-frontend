<template>
<b-container class="game-page" v-if="!isLoading">
    <template v-if="hasGuessed">
        <guess-result :actual="location" :guess="guessedLocation"></guess-result>
    </template>
    <template v-else>
        <street-view @positionChanged="location = $event"></street-view>
        <location-guesser :location="location" @guessLocation="guessedLocation = $event"></location-guesser>
    </template>
</b-container>
</template>

<script>
import StreetView from '@/components/StreetView.vue';
import LocationGuesser from '@/components/LocationGuesser.vue';
import InvitePlayers from '@/components/InvitePlayers.vue';
import GuessResult from '@/components/GuessResult.vue';
import { mapActions } from 'vuex';
const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;

export default {
    components: {
        StreetView,
        LocationGuesser,
        GuessResult
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.loadGoogleScript();
        this.listenForScoreUpdates();
    },
    data() {
        return {
            isLoading: true,
            location: {},
            guessedLocation: {}
        };
    },
    computed: {
        hasGuessed() {
            return !_.isEmpty(this.guessedLocation);
        }
    },
    methods: {
        ...mapActions([
            'listenForScoreUpdates'
        ]),
        // Load Google API in script tag and append
         loadGoogleScript() {
            return new Promise((resolve, reject) => {
                let script = document.createElement('script');
                script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
                script.addEventListener('load', () => {
                    this.isLoading = false;
                    resolve();
                });
                script.addEventListener('error', (e) =>  {
                    reject(e);
                });
                document.body.appendChild(script);
            });
        }
    }
};
</script>

<style scoped lang="scss">
#street-view {
    height: 600px;
}

</style>
