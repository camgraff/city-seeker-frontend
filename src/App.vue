<template>
    <div id="app">
        <b-navbar class="navbar" type="dark">
            <b-navbar-brand to="/">City Seeker</b-navbar-brand>
            <b-nav>
                <b-nav-item to="/">Play</b-nav-item>
            </b-nav>
        </b-navbar>
        <div class="main">
            <router-view/>
        </div>
        <div class="footer">
            <div class="footer-group">
                <p class="fg-title">Contact</p>
                <a class="fg-link" href="mailto:graffcameron@gmail.com" target="_blank">Email Us</a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#app {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .navbar {
        width: 100%;
        margin-bottom: 1rem;
        background-color: #3193c8;
        .nav-link {
            color: white;
        }
    }

    .main {
        width: 100%;
        flex: 1;
    }

    .footer {
        margin-top: 2rem;
        width: 100%;
        height: 100px;
        background-color: #3193c8;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        .footer-group {
            color: black;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .fg-title {
                font-weight: 500;
                font-size: 1.3rem;
                margin: 5px;
            }
            .fg-link {
                color: #065f8f;
            }
        }
    }
}
</style>
