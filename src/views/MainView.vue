<template>
<div class="main-view">
    <app-header></app-header>
    <div class="content">
        <router-view></router-view>
    </div>
    <app-footer></app-footer>
</div>
</template>

<script>
import AppFooter from '../components/layout/AppFooter.vue';
import AppHeader from '../components/layout/AppHeader.vue';

export default {
    components: {
        AppFooter,
        AppHeader
    }

};
</script>

<style scoped lang="scss">
.main-view {
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 100%;
    .content {
        flex: 1;
    }
}


</style>
