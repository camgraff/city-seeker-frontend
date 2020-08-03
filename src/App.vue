<template>
    <div id="app">
            <b-navbar type="dark" variant="info">
                <b-navbar-brand to="/">City Seeker</b-navbar-brand>
                <b-nav>
                    <b-nav-item to="/">Play</b-nav-item>
                </b-nav>
            </b-navbar>
        <router-view/>
    </div>
</template>

<style lang="scss" scoped>
nav {
    margin-bottom: 1rem;
    .nav-link {
        color: darkblue;
    }
}
</style>
