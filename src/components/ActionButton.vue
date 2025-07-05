<template>
    <button
        class="action-button"
        :class="buttonClasses"
        :disabled="disabled"
        @click="handleClick"
    >
        <span v-if="loading" class="loading-spinner"></span>
        <span class="button-text">{{ label }}</span>
    </button>
</template>

<script lang="ts">
import { ButtonSize, ButtonVariant } from "@/types/common";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ActionButton extends Vue {
    @Prop({ required: true })
    public label!: string;

    @Prop({ default: false })
    public disabled!: boolean;

    @Prop({ default: false })
    public loading!: boolean;

    @Prop({ default: "primary" })
    public variant!: ButtonVariant;

    @Prop({ default: "medium" })
    public size!: ButtonSize;

    public get buttonClasses(): string[] {
        const classes: string[] = [];

        classes.push(`variant-${this.variant}`);
        classes.push(`size-${this.size}`);

        if (this.disabled) {
            classes.push("disabled");
        }

        if (this.loading) {
            classes.push("loading");
        }

        return classes;
    }

    public handleClick(): void {
        if (!this.disabled && !this.loading) {
            this.$emit("click");
        }
    }
}
</script>

<style lang="scss" scoped>
.action-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    outline: none;
    position: relative;
    overflow: hidden;

    &:focus {
        box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.3);
    }

    // サイズバリエーション
    &.size-small {
        padding: 6px 12px;
        font-size: 12px;
        min-width: 60px;
        height: 28px;
    }

    &.size-medium {
        padding: 8px 16px;
        font-size: 14px;
        min-width: 80px;
        height: 36px;
    }

    &.size-large {
        padding: 12px 24px;
        font-size: 16px;
        min-width: 100px;
        height: 44px;
    }

    // カラーバリエーション
    &.variant-primary {
        background-color: #1976d2;
        color: #fff;

        &:hover:not(.disabled):not(.loading) {
            background-color: #1565c0;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(25, 118, 210, 0.3);
        }

        &:active:not(.disabled):not(.loading) {
            background-color: #0d47a1;
            transform: translateY(0);
        }
    }

    &.variant-secondary {
        background-color: #f5f5f5;
        color: #333;
        border: 1px solid #ddd;

        &:hover:not(.disabled):not(.loading) {
            background-color: #e0e0e0;
            border-color: #bbb;
        }

        &:active:not(.disabled):not(.loading) {
            background-color: #d5d5d5;
        }
    }

    &.variant-danger {
        background-color: #d32f2f;
        color: #fff;

        &:hover:not(.disabled):not(.loading) {
            background-color: #c62828;
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(211, 47, 47, 0.3);
        }

        &:active:not(.disabled):not(.loading) {
            background-color: #b71c1c;
            transform: translateY(0);
        }
    }

    // 状態
    &.disabled {
        background-color: #e0e0e0;
        color: #9e9e9e;
        cursor: not-allowed;
        transform: none;
        box-shadow: none;

        &.variant-primary,
        &.variant-danger {
            background-color: #e0e0e0;
        }
    }

    &.loading {
        cursor: wait;

        .button-text {
            opacity: 0.7;
        }
    }

    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-right: 8px;
    }

    .button-text {
        transition: opacity 0.2s ease;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
