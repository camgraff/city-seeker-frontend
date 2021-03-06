import io from 'socket.io-client';
import types from './mutations.js';

const socket = {
    state: () => ({
        socket: null,
    }),

    getters: {

    },

    actions: {
        initSocket({ commit }) {
            let socket = io(process.env.VUE_APP_API_BASE_URL);
            commit(types.SOCKET_SUCCESS, socket);
        },
        joinGame({ commit }, config) {
            commit(types.SOCKET_JOIN_GAME, config);
        },
        registerListener({commit}, config) {
            commit(types.SOCKET_REGISTER_LISTENER, config);
        },
        startGame({commit}, gameId) {
            commit(types.SOCKET_START_GAME, gameId);
        },
        updateScore({commit}, config) {
            commit(types.SOCKET_UPDATE_SCORE, config);
        }
    },

    mutations: {
        [types.SOCKET_SUCCESS](state, socket) {
            state.socket = socket;
        },

        [types.SOCKET_JOIN_GAME]({ socket }, { gameId, username }) {
            socket.emit('joinGame', gameId, username);
        },

        [types.SOCKET_REGISTER_LISTENER]({socket}, {event, callback}) {
            socket.on(event, callback);
        },

        [types.SOCKET_START_GAME]({socket}, gameId) {
            socket.emit('startGame', gameId);
        },
        [types.SOCKET_UPDATE_SCORE]({socket}, {score, gameId}) {
            socket.emit('updateScore', score, gameId);
        }
    }
};

export default socket;
