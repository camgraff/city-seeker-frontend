<template>
 <div class="guess-result">
    <div id="map"></div>
 </div>
</template>

<script>
export default {
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
    },
    data() {
        return {
            map: null
        };
    },
    methods: {
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
