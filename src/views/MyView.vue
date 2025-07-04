<template>
    <div>{{ message }}</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MySampleView extends Vue {
    public message: string = "Hello from MyView!";
}
</script>
