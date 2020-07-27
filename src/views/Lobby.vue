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
    </div>
</template>

<script>
export default {
    data() {
        return {
            players: [],
            showModal: true,
            displayName: '',
            nameIsValid: null
        };
    },
    methods: {
        handleOk(event) {
            event.preventDefault();
            this.validateForm();
            if (this.nameIsValid) {
                this.players.push({
                    name: this.displayName
                });
                this.showModal = false;
            }
        },
        validateForm() {
            if (this.displayName) {
                this.nameIsValid = true;
            } else {
                this.nameIsValid = false;
            }
        }
    }

};
</script>

<style scoped lang="scss">
.lobby {
    text-align: center;
}

</style>
