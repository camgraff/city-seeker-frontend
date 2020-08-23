<template>
    <b-container class="lobby px-5" fluid>
        <b-modal 
            centered
            ok-only 
            hide-header-close 
            no-close-on-backdrop 
            no-close-on-esc
            v-model="showModal" 
            title="Enter Display Name" 
            :ok-disabled="displayName == ''"
            @ok="handleOk"
        >
            <b-form-input 
                :state="nameIsValid" 
                v-model="displayName" 
                placeholder="Enter name here..."
                required>
            </b-form-input>
        </b-modal>

        <b-modal
            centered
            ok-only
            v-model="invitePlayers"
            title="Invite Friends"
        >
            <p>Send your friend the link below to have them join your game!</p>
            <b-form-input
                :value="url"
                id="invite-url"
                readonly
            ></b-form-input>
            <b-button @click="copyURL" class="ml-2" title="Copy Invite URL" variant="secondary"><b-icon-clipboard></b-icon-clipboard></b-button>
        </b-modal>

        <b-button variant="info" class="float-right" @click="invitePlayers = true">Invite Friends</b-button>
        <h1 class="">Lobby</h1>
        <b-table-lite :items="players"></b-table-lite>
        <b-button @click="() => startGame(id)" variant="primary">Start Game</b-button>
    </b-container>
</template>

<script>
import io from 'socket.io-client';
import { mapActions, mapGetters } from 'vuex';

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
            showModal: true,
            displayName: '',
            nameIsValid: null,
            invitePlayers: false,
        };
    },
    computed: {
        ...mapGetters([
            'getPlayers'
        ]),
        players() {
            return this.getPlayers.map(player => {
                return { name: player.username };
            });
        },
        url() {
            return window.location.href;
        }
    },
    created() {
        this.initSocket(); 
        this.registerListener({event: 'userJoined', callback: (username) => {
            this.addPlayer(username);
        }});
        this.registerListener({event: 'startGame', callback: () => {
            this.$emit('startGame');
        }});
    },
    methods: {
        ...mapActions([
            'initSocket',
            'joinGame',
            'registerListener',
            'startGame',
            'addPlayer'
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
        copyURL() {
            document.getElementById('invite-url').select();
            document.execCommand('copy');
        }
    }

};
</script>

<style scoped lang="scss">
.lobby {
    text-align: center;
    h1 {
        clear: both;
    }
}

#invite-url {
    width: 80%;
    margin-right: 0;
    display: inline;
}
</style>
