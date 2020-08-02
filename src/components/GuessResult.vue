<template>
 <div class="guess-result">
     <h1>Results</h1>
     <h3>You were {{ distanceOff }} Km off on your guess</h3>
    <div id="map"></div>
    <round-result-table></round-result-table>
 </div>
</template>

<script>
import RoundResultTable from './RoundResultTable.vue';
import { mapActions } from 'vuex';
const EARTH_RADIUS = 6371; // kilometers
const MAX_DISTANCE = EARTH_RADIUS * Math.PI;

export default {
    components: {
        RoundResultTable
    },
    props: {
        actual: {
            type: Object,
            required: true
        },
        guess: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.initMap();
        let score = Math.round(this.distanceOff / MAX_DISTANCE * 1000);
        this.updateScore({
            score: Math.round(score),
            gameId: this.$route.params.id
        });
    },
    data() {
        return {
            map: null
        };
    },
    computed: {
        distanceOff() {
            return Math.round(this.calcDistance(this.actual.lat, this.actual.lng, this.guess.lat, this.guess.lng));
        }
    },
    methods: {
        ...mapActions([
            'updateScore'
        ]),
        initMap() {
            const ZOOM_LEVEL = 2;
            this.map = new window.google.maps.Map(document.getElementById("map"), {
                center: { lat: 0, lng: 0 },
                zoom: ZOOM_LEVEL,
                disableDefaultUI: true,
                minZoom: ZOOM_LEVEL,
                maxZoom: ZOOM_LEVEL,
                gestureHandling: 'none'
            });
            
            this.placeMarker(this.guess);
            this.placeMarker(this.actual);

        },

        placeMarker(latLng) {
            new window.google.maps.Marker({
                position: latLng,
                map: this.map
            });
        },
        
        calcDistance(aLat, aLng, bLat, bLng) {
            function degreesToRadians(deg) {
                return deg * (Math.PI / 180);
            }
            
            let lat1 = degreesToRadians(aLat);
            let lat2 = degreesToRadians(bLat);
            let lng1 = degreesToRadians(aLng);
            let lng2 = degreesToRadians(bLng);

            let dlat = lat1 - lat2;
            let dlng = lng1 - lng2;
            let dist = Math.pow(Math.sin(dlat / 2), 2)
                + Math.cos(lat1) * Math.cos(lat2) *
                Math.pow(Math.sin(dlng / 2), 2);

            dist = 2 * Math.asin(Math.sqrt(dist));
            dist *= EARTH_RADIUS;
            return dist;
        },
    }

};
</script>

<style scoped lang="scss">
.guess-result {
    width: 100%;
    height: 500px;
    margin: auto;
    #map {
        width: 100%;
        height: 500px;
        margin: auto;
    }
}

</style>
