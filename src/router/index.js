import Vue from 'vue';
import VueRouter from 'vue-router';
import Game from '../views/Game.vue';
import Play from '../views/Play.vue';
import Lobby from '../views/Lobby.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/game/1234'
    },
    {
        path: '/game/:id',
        component: Game,
        props: true
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router;
