<template>
<div id="street-view">

</div>
</template>

<script>
const MAX_TRAVEL_DIST = 1; // kilometer
const US_BOUNDS = {
    top: 49.3457868,
    left: -124.7844079,
    right: -66.9513812,
    bottom: 24.7433195,
};
export default {
    mounted() {
        this.initializeStreetView();
    },
    data() {
        return {
            initialLocation: {}
        };
    },
    methods: {
         generateLocation(bounds) {
            return {
                lat: Math.random() * (bounds.top - bounds.bottom) + bounds.bottom,
                lng: Math.random() * (bounds.right - bounds.left) + bounds.left,
            };
        },

         tryGetStreetView(streetViewService) {
            let location = this.generateLocation(US_BOUNDS);
            return new Promise((resolve, reject) => {
                streetViewService.getPanorama({ 
                    location, 
                    radius: 1000000,
                    preference: 'nearest'
                 },
                    function (data, status) {
                        resolve({
                            data,
                            status,
                        });
                    }
                );
            });
         },

          async initializeStreetView() {
            let streetViewService = new window.google.maps.StreetViewService();
            let panorama = new window.google.maps.StreetViewPanorama(
                document.getElementById('street-view'),
                {
                    disableDefaultUI: true,
                    showRoadLabels: false
                }
            );
            let response = await this.tryGetStreetView(streetViewService);

            panorama.setPano(response.data.location.pano);
            
            panorama.addListener('position_changed', () =>
                this.handlePosChanged(panorama)
            );

            // Save the initial location
            let listener = panorama.addListener('status_changed', () => {
                this.initialLocation = {
                    lat: panorama.position.lat(),
                    lng: panorama.position.lng(),
                };
                window.google.maps.event.removeListener(listener);
            });
        },

         handlePosChanged(panorama) {
             this.$emit('positionChanged', {
                lat: panorama.position.lat(),
                lng: panorama.position.lng()
            });
            
             function degreesToRadians(deg) {
                return deg * (Math.PI / 180);
            }

            let lat1 = degreesToRadians(this.initialLocation.lat);
            let lat2 = degreesToRadians(panorama.position.lat());
            let lng1 = degreesToRadians(panorama.position.lng());
            let lng2 = degreesToRadians(this.initialLocation.lng);

            let dlat = lat1 - lat2;
            let dlng = lng1 - lng2;
            let dstFromStart = Math.pow(Math.sin(dlat / 2), 2) 
                + Math.cos(lat1) * Math.cos(lat2) * 
                Math.pow(Math.sin(dlng / 2), 2);
            dstFromStart = 2 * Math.asin(Math.sqrt(dstFromStart));
            const EARTH_RADIUS = 6371; // kilometers
            dstFromStart *= EARTH_RADIUS;
        
            // TODO: check if user has traveled out of max distance end hide and prevent further travel in that direction
        }

    }

};
</script>

<style>

</style>
