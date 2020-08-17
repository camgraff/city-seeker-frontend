<template>
    <div id="app">
        <main-view></main-view>
    </div>
</template>

<script>
import MainView from './views/MainView.vue';
export default {
    components: {
        MainView
    }

};
</script>

<style lang="scss" scoped>
#app {
    height: 100%;
}
</style>
