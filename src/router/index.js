import Vue from 'vue';
import VueRouter from 'vue-router';
import GamePage from '../views/GamePage.vue';
import Lobby from '../views/Lobby.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/game/:id',
        component: Lobby,
        props: true
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
