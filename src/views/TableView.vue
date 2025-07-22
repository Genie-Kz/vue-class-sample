<template>
    <div class="table-switcher">
        <div class="table-switcher__controls">
            <h2 class="table-switcher__title">表示パターン切り替え</h2>
            <div class="table-switcher__buttons">
                <button
                    v-for="pattern in patterns"
                    :key="pattern.id"
                    @click="selectedPattern = pattern.id"
                    :class="[
                        'table-switcher__button',
                        {
                            'table-switcher__button--active':
                                selectedPattern === pattern.id,
                        },
                    ]"
                >
                    {{ pattern.name }}
                </button>
            </div>
        </div>

        <div class="table-switcher__content">
            <div class="table-grid">
                <!-- Pattern 1: 全て表示 -->
                <template v-if="selectedPattern === 1">
                    <!-- 1行目 -->
                    <div class="table-grid__row">
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル1
                        </div>
                        <div class="table-grid__cell">項目1</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル2
                        </div>
                        <div class="table-grid__cell">項目2</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル3
                        </div>
                        <div class="table-grid__cell">項目3</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル4
                        </div>
                        <div class="table-grid__cell">項目4</div>
                    </div>
                    <!-- 2行目 -->
                    <div class="table-grid__row">
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルA
                        </div>
                        <div class="table-grid__cell">項目A</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルB
                        </div>
                        <div class="table-grid__cell">項目B</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルC
                        </div>
                        <div class="table-grid__cell">項目C</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルD
                        </div>
                        <div class="table-grid__cell">項目D</div>
                    </div>
                </template>

                <!-- Pattern 2: タイトルBと項目Bを非表示 -->
                <template v-if="selectedPattern === 2">
                    <!-- 1行目 -->
                    <div class="table-grid__row">
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル1
                        </div>
                        <div class="table-grid__cell">項目1</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル2
                        </div>
                        <div class="table-grid__cell">項目2</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル3
                        </div>
                        <div class="table-grid__cell">項目3</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル4
                        </div>
                        <div class="table-grid__cell">項目4</div>
                    </div>
                    <!-- 2行目 -->
                    <div class="table-grid__row">
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルA
                        </div>
                        <div class="table-grid__cell">項目A</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルC
                        </div>
                        <div class="table-grid__cell">項目C</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルD
                        </div>
                        <div class="table-grid__cell">項目D</div>
                    </div>
                </template>

                <!-- Pattern 3: タイトルAと項目Aを非表示 -->
                <template v-if="selectedPattern === 3">
                    <!-- 1行目 -->
                    <div class="table-grid__row">
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル1
                        </div>
                        <div class="table-grid__cell">項目1</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル2
                        </div>
                        <div class="table-grid__cell">項目2</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル3
                        </div>
                        <div class="table-grid__cell">項目3</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトル4
                        </div>
                        <div class="table-grid__cell">項目4</div>
                    </div>
                    <!-- 2行目 -->
                    <div class="table-grid__row">
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルC
                        </div>
                        <div class="table-grid__cell">項目C</div>
                        <div class="table-grid__cell table-grid__cell--header">
                            タイトルD
                        </div>
                        <div class="table-grid__cell">項目D</div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

interface Pattern {
    id: number;
    name: string;
}

@Component
export default class TablePatternSwitcher extends Vue {
    selectedPattern: number = 1;

    patterns: Pattern[] = [
        { id: 1, name: "パターン1（全表示）" },
        { id: 2, name: "パターン2（B列非表示）" },
        { id: 3, name: "パターン3（A行非表示）" },
    ];
}
</script>

<style lang="scss" scoped>
.table-switcher {
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        sans-serif;

    &__title {
        margin: 0 0 20px 0;
        font-size: 24px;
        font-weight: 600;
        color: #333;
    }

    &__buttons {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
    }

    &__button {
        padding: 10px 20px;
        border: 2px solid #ddd;
        border-radius: 6px;
        background: white;
        color: #666;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
            border-color: #8b7fff;
            color: #8b7fff;
        }

        &--active {
            border-color: #8b7fff;
            background: #8b7fff;
            color: white;

            &:hover {
                background: #7a6dff;
                border-color: #7a6dff;
            }
        }
    }

    &__content {
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        padding: 20px;
    }
}

.table-grid {
    border: 1px solid #000;
    display: inline-block;
    min-width: 100%;

    &__row {
        display: flex;
        border-bottom: 1px solid #000;

        &:last-child {
            border-bottom: none;
        }
    }

    &__cell {
        padding: 12px 16px;
        border-right: 1px solid #000;
        width: 120px;
        min-width: 120px;
        max-width: 120px;
        display: flex;
        align-items: center;
        font-size: 14px;
        flex: 0 0 120px;
        min-height: 44px;

        &:last-child {
            border-right: none;
        }

        &--header {
            background: #8b7fff;
            color: white;
            font-weight: 600;
        }
    }
}

// レスポンシブ対応
@media (max-width: 768px) {
    .table-switcher {
        padding: 16px;

        &__title {
            font-size: 20px;
        }

        &__buttons {
            flex-direction: column;
            gap: 8px;
        }

        &__button {
            width: 100%;
            text-align: center;
        }

        &__content {
            padding: 16px;
        }
    }

    .table-grid {
        &__cell {
            padding: 8px 12px;
            min-width: 80px;
            font-size: 12px;
        }
    }
}
</style>
