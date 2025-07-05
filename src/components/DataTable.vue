<template>
    <div class="data-table">
        <table class="table">
            <thead>
                <tr class="table-header">
                    <th class="checkbox-column">選択</th>
                    <th class="name-column">名前</th>
                    <th class="category-column">カテゴリ</th>
                    <th class="status-column">ステータス</th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="item in items"
                    :key="item.id"
                    class="table-row"
                    :class="{ selected: selectedId === item.id }"
                >
                    <td class="checkbox-cell">
                        <input
                            type="checkbox"
                            :value="item.id"
                            :checked="selectedId === item.id"
                            @change="handleSelectionChange(item.id)"
                            class="selection-checkbox"
                        />
                    </td>
                    <td class="name-cell">{{ item.name }}</td>
                    <td class="category-cell">{{ item.category }}</td>
                    <td class="status-cell">
                        <span
                            class="status-badge"
                            :class="{
                                active: item.status === '有効',
                                inactive: item.status === '無効',
                            }"
                        >
                            {{ item.status }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { TableItem } from "@/types/common";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class DataTable extends Vue {
    @Prop({ required: true })
    public items!: TableItem[];

    @Prop({ default: null })
    public selectedId!: number | null;

    private radioGroupName = `radio-group-${Math.random()
        .toString(36)
        .substring(2, 9)}`;

    @Emit("selection-change")
    public handleSelectionChange(itemId: number): number | null {
        // 既に選択されているアイテムをクリックした場合は選択解除
        const newSelection = this.selectedId === itemId ? null : itemId;
        return newSelection;
    }
}
</script>

<style lang="scss" scoped>
.data-table {
    width: 100%;

    .table {
        width: 100%;
        border-collapse: collapse;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        overflow: auto;

        .table-header {
            background-color: #f5f5f5;

            th {
                padding: 12px 16px;
                text-align: left;
                font-weight: 600;
                color: #333;
                border-bottom: 2px solid #e0e0e0;

                &.checkbox-column {
                    width: 80px;
                    text-align: center;
                }

                &.name-column {
                    width: 200px;
                }

                &.category-column {
                    width: 150px;
                }

                &.status-column {
                    width: 120px;
                    text-align: center;
                }
            }
        }

        .table-row {
            transition: background-color 0.2s ease;

            &:hover {
                background-color: #f8f9fa;
            }

            &.selected {
                background-color: #e3f2fd;
            }

            td {
                padding: 12px 16px;
                border-bottom: 1px solid #e0e0e0;
                vertical-align: middle;

                &.checkbox-cell {
                    text-align: center;

                    .selection-checkbox {
                        cursor: pointer;
                        transform: scale(1.2);
                        appearance: none;
                        -webkit-appearance: none;
                        -moz-appearance: none;
                        width: 18px;
                        height: 18px;
                        border: 1px solid #000;
                        border-radius: 0;
                        background-color: transparent;
                        position: relative;
                        outline: none;

                        &:checked {
                            background-color: transparent;
                            border-color: #000;
                        }

                        &:checked::after {
                            content: "✓";
                            position: absolute;
                            top: -2px;
                            left: 2px;
                            font-size: 14px;
                            font-weight: bold;
                            color: #000;
                        }

                        &:focus {
                            box-shadow: none;
                        }
                    }
                }

                &.name-cell {
                    font-weight: 500;
                    color: #333;
                }

                &.category-cell {
                    color: #666;
                }

                &.status-cell {
                    text-align: center;

                    .status-badge {
                        padding: 4px 8px;
                        border-radius: 12px;
                        font-size: 12px;
                        font-weight: 500;

                        &.active {
                            background-color: #e8f5e8;
                            color: #2e7d32;
                        }

                        &.inactive {
                            background-color: #fce4ec;
                            color: #c2185b;
                        }
                    }
                }
            }

            &:last-child td {
                border-bottom: none;
            }
        }
    }
}
</style>
