<template>
<div class="game-page" v-if="!isLoading">
    <invite-players :showModal="true"></invite-players>
    <street-view @positionChanged="location = $event"></street-view>
    <location-guesser></location-guesser>
</div>
</template>

<script>
import StreetView from '@/components/StreetView.vue';
import LocationGuesser from '@/components/LocationGuesser.vue';
import InvitePlayers from '@/components/InvitePlayers.vue';
const API_KEY = process.env.VUE_APP_GOOGLE_API_KEY;

export default {
    components: {
        StreetView,
        LocationGuesser,
        InvitePlayers
    },
    props: {
        id: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.loadGoogleScript();
    },
    data() {
        return {
            isLoading: true,
            location: {}
        };
    },
    methods: {
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
