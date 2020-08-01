<template>
    <div class="lobby">
        <b-modal v-model="showModal" title="Enter Display Name" @ok="handleOk">
            <b-form-input 
                :state="nameIsValid" 
                v-model="displayName" 
                placeholder="Enter name here..."
                required>
            </b-form-input>
        </b-modal>

        <h1>Lobby</h1>
        <b-table-lite :items="players"></b-table-lite>
        <b-button @click="() => startGame(id)" variant="primary">Start Game</b-button>
    </div>
</template>

<script>
import io from 'socket.io-client';
import { mapActions } from 'vuex';

export default {
    props: {
        // The game ID
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            players: [],
            showModal: true,
            displayName: '',
            nameIsValid: null
        };
    },
    created() {
        this.initSocket(); 
        this.registerListener({event: 'userJoined', callback: (username) => {
            this.addPlayer(username);
        }});
        this.registerListener({event: 'startGame', callback: () => {
            console.log('game started', this.id);
            this.$emit('startGame');
        }});
    },
    methods: {
        ...mapActions([
            'initSocket',
            'joinGame',
            'registerListener',
            'startGame'
        ]),
        handleOk(event) {
            event.preventDefault();
            this.validateForm();
            if (this.nameIsValid) {
                this.addPlayer(this.displayName);
                this.showModal = false;
                this.joinGame({ gameId: this.id, username: this.displayName });
            }
        },
        validateForm() {
            if (this.displayName) {
                this.nameIsValid = true;
            } else {
                this.nameIsValid = false;
            }
        },
        addPlayer(name) {
            this.players.push({ name });
        },
    }

};
</script>

<style scoped lang="scss">
.lobby {
    text-align: center;
}

</style>
