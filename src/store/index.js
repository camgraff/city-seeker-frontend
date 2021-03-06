import Vue from 'vue';
import Vuex from 'vuex';
import socket from './socket.js';
import players from './players.js';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        socket,
        players
    }
});
