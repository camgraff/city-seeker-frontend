import types from './mutations.js';
import store from './index.js';

const players = {
    state: () => ({
        players: [],
    }),

    getters: {
        getPlayers: ({players}) => {
            return players;
        }
    },

    actions: {
        listenForScoreUpdates({commit}) {
            store.dispatch('registerListener', {
                event: 'playerScoreUpdated',
                callback: (username, score) => {
                    commit(types.PLAYER_UPDATE_SCORE, {username, score});
                }
            });
        },
        addPlayer({commit}, username) {
            commit(types.ADD_PLAYER, username);
        }
    },

    mutations: {
        [types.PLAYER_UPDATE_SCORE]({players}, {username, score}) {
            players.find(player => player.username == username).scores.push(score);
        },

        [types.ADD_PLAYER]({players}, username) {
            players.push({
                username,
                scores: []
            });
        }
    }
};

export default players;
