<template>
    <div class="home">
        <img alt="Vue logo" src="../assets/logo.png" />
        <h1>{{ message }}</h1>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class HomeView extends Vue {
    message: string = "Hello from HomeView!";
}
</script>
