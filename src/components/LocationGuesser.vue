<template>
<div>
    <div id="location-guesser"></div>
    <b-button v-if="marker != null" variant="primary" @click="guessLocation">Submit Guess</b-button>
</div>
</template>

<script>
const EARTH_RADIUS = 6371; // kilometers
const MAX_DISTANCE = Math.round(EARTH_RADIUS * 2 * Math.PI / 2);

export default {
    props: {
        location: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.initMap();
    },
    data() {
        return {
            marker: null
        };
    },
    methods: {
        initMap() {
            const ZOOM_LEVEL = 2;
            let map = new window.google.maps.Map(document.getElementById("location-guesser"), {
                center: { lat: -34.397, lng: 150.644 },
                zoom: ZOOM_LEVEL,
                disableDefaultUI: true,
                minZoom: ZOOM_LEVEL,
                maxZoom: ZOOM_LEVEL
            });

            map.addListener('click', (e) => {
                this.placeMarker(e.latLng, map);
            });
        },

        placeMarker(latLng, map) {
            if (this.marker == null) {
                this.marker = new window.google.maps.Marker({
                    position: latLng,
                    map
                });
            } else {
                this.marker.setPosition(latLng);
            }
        },

        guessLocation() {
            this.$emit('guessLocation', this.marker.getPosition());
            let dist = this.calcDistance(
                this.location.lat,
                this.location.lng,
                this.marker.getPosition().lat(),
                this.marker.getPosition().lng()
            );
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
#location-guesser {
    width: 100%;
    height: 500px;
    margin: auto;
}
</style>
