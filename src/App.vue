<script setup lang="ts"></script>

<template>
    <div id="app">
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link> |
            <router-link to="/data-selection">データ選択</router-link> |
            <router-link to="/management">管理画面</router-link> |
            <router-link to="/table-pattern-switcher"
                >テーブル切り替え</router-link
            >
            |
            <router-link to="/check-table">チェックテーブル</router-link>
        </nav>
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

nav {
    padding: 30px;

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
