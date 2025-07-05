<template>
    <div>{{ message }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MyView extends Vue {
    public message: string = "Hello from MyView!";
}
</script>
