<template>
    <div class="about">
        <h1>This is an about page</h1>
        <p>{{ message }}</p>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AboutView extends Vue {
    message: string = "Hello from HomeView!";
}
</script>
