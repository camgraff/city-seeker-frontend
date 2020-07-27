<template>
    <div class="invite-player">
        <b-modal v-model="showModal" title="Invite Friends!">
            Invite Friends to you game!
        </b-modal>
    </div>
</template>

<script>
export default {
    props: {
        showModal: {
            type: Boolean,
            required: true
        }
    }
};
</script>

<style>

</style>
