<template>
    <div class="editable-table">
        <div class="editable-table__header">
            <h3 class="editable-table__title">{{ title }}</h3>
            <div class="editable-table__actions">
                <button
                    @click="addRow"
                    class="editable-table__button editable-table__button--primary"
                >
                    行を追加
                </button>
                <button
                    @click="saveData"
                    class="editable-table__button editable-table__button--success"
                >
                    保存
                </button>
            </div>
        </div>

        <div class="editable-table__container">
            <table class="editable-table__table">
                <thead>
                    <tr>
                        <th
                            v-for="column in columns"
                            :key="column.key"
                            class="editable-table__th"
                        >
                            {{ column.label }}
                        </th>
                        <th class="editable-table__th">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(row, index) in localData"
                        :key="row.id || index"
                        class="editable-table__tr"
                    >
                        <td
                            v-for="column in columns"
                            :key="column.key"
                            class="editable-table__td"
                        >
                            <input
                                v-if="column.type === 'text' || !column.type"
                                type="text"
                                :value="row[column.key]"
                                @input="
                                    handleTextInput(index, column.key, $event)
                                "
                                class="editable-table__input"
                                :placeholder="column.placeholder || ''"
                            />
                            <input
                                v-else-if="column.type === 'number'"
                                type="number"
                                :value="row[column.key]"
                                @input="
                                    handleNumberInput(index, column.key, $event)
                                "
                                class="editable-table__input"
                                :placeholder="column.placeholder || ''"
                            />
                            <select
                                v-else-if="column.type === 'select'"
                                :value="row[column.key]"
                                @change="
                                    handleSelectChange(
                                        index,
                                        column.key,
                                        $event
                                    )
                                "
                                class="editable-table__select"
                            >
                                <option value="">選択してください</option>
                                <option
                                    v-for="option in column.options"
                                    :key="option.value"
                                    :value="option.value"
                                >
                                    {{ option.label }}
                                </option>
                            </select>
                        </td>
                        <td
                            class="editable-table__td editable-table__td--actions"
                        >
                            <button
                                @click="deleteRow(index)"
                                class="editable-table__button editable-table__button--danger"
                            >
                                削除
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="editable-table__summary">
            <p>合計: {{ totalRows }}行</p>
            <p>最終更新: {{ lastUpdated || "未更新" }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue, Watch } from "vue-property-decorator";

export interface TableColumn {
    key: string;
    label: string;
    type?: "text" | "number" | "select";
    placeholder?: string;
    options?: Array<{ value: string; label: string }>;
}

export interface TableRow {
    id?: string | number;
    [key: string]: string | number | undefined;
}

@Component
export default class EditableTable extends Vue {
    @Prop({ required: true }) title!: string;
    @Prop({ required: true }) columns!: TableColumn[];
    @Prop({ required: true }) data!: TableRow[];

    localData: TableRow[] = [];
    lastUpdated: string = "";

    mounted() {
        this.localData = [...this.data];
    }

    @Watch("data", { deep: true })
    onDataChanged(newData: TableRow[]) {
        this.localData = [...newData];
    }

    get totalRows(): number {
        return this.localData.length;
    }

    @Emit("data-updated")
    updateCell(rowIndex: number, columnKey: string, value: string | number) {
        const updatedRow = { ...this.localData[rowIndex] };
        updatedRow[columnKey] = value;
        // this.localData.splice(rowIndex, 1, updatedRow);
        // this.localData[rowIndex] = updatedRow;
        // this.data[rowIndex] = updatedRow; // 直接dataを更新
        // this.data.splice(rowIndex, 1, updatedRow); // 直接dataを更新
        this.data[0].priceA = Math.round(Math.random() * 1000); // デモ用にランダムな値を設定
        // 親コンポーネントに変更を通知
        // this.$emit("data-updated", [...this.localData]);
        // return [...this.localData]; // 変更後のデータを返す
    }

    handleTextInput(rowIndex: number, columnKey: string, event: Event) {
        const target = event.target as HTMLInputElement;
        this.updateCell(rowIndex, columnKey, target.value);
    }

    handleNumberInput(rowIndex: number, columnKey: string, event: Event) {
        const target = event.target as HTMLInputElement;
        this.updateCell(rowIndex, columnKey, Number(target.value));
    }

    handleSelectChange(rowIndex: number, columnKey: string, event: Event) {
        const target = event.target as HTMLSelectElement;
        this.updateCell(rowIndex, columnKey, target.value);
    }

    addRow() {
        const newRow: TableRow = {
            id: Date.now(),
        };

        // 各カラムのデフォルト値を設定
        this.columns.forEach((column) => {
            newRow[column.key] = column.type === "number" ? 0 : "";
        });

        this.localData.push(newRow);
        this.$emit("data-updated", [...this.localData]);
        this.$emit("row-added", newRow);
    }

    deleteRow(index: number) {
        const deletedRow = this.localData[index];
        this.localData.splice(index, 1);
        this.$emit("data-updated", [...this.localData]);
        this.$emit("row-deleted", deletedRow);
    }

    saveData() {
        this.lastUpdated = new Date().toLocaleString("ja-JP");
        this.$emit("data-saved", [...this.localData]);
    }
}
</script>

<style lang="scss" scoped>
.editable-table {
    border: 1px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
    background: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &__header {
        background: #f8f9fa;
        padding: 16px 20px;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }

    &__actions {
        display: flex;
        gap: 8px;
    }

    &__button {
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;

        &--primary {
            background: #007bff;
            color: white;

            &:hover {
                background: #0056b3;
            }
        }

        &--success {
            background: #28a745;
            color: white;

            &:hover {
                background: #1e7e34;
            }
        }

        &--danger {
            background: #dc3545;
            color: white;
            padding: 4px 8px;
            font-size: 12px;

            &:hover {
                background: #c82333;
            }
        }
    }

    &__container {
        overflow-x: auto;
        max-height: 400px;
        overflow-y: auto;
    }

    &__table {
        width: 100%;
        border-collapse: collapse;
    }

    &__th {
        background: #e9ecef;
        padding: 12px;
        text-align: left;
        font-weight: 600;
        color: #495057;
        border-bottom: 2px solid #dee2e6;
        position: sticky;
        top: 0;
        z-index: 1;
    }

    &__tr {
        &:nth-child(even) {
            background: #f8f9fa;
        }

        &:hover {
            background: #e3f2fd;
        }
    }

    &__td {
        padding: 8px 12px;
        border-bottom: 1px solid #dee2e6;
        vertical-align: middle;

        &--actions {
            text-align: center;
            width: 80px;
        }
    }

    &__input,
    &__select {
        width: 100%;
        padding: 6px 8px;
        border: 1px solid #ced4da;
        border-radius: 4px;
        font-size: 14px;
        transition: border-color 0.15s ease-in-out;

        &:focus {
            outline: none;
            border-color: #80bdff;
            box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
        }
    }

    &__select {
        cursor: pointer;
    }

    &__summary {
        background: #f8f9fa;
        padding: 12px 20px;
        border-top: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #6c757d;

        p {
            margin: 0;
        }
    }
}

@media (max-width: 768px) {
    .editable-table {
        &__header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
        }

        &__actions {
            width: 100%;
            justify-content: flex-start;
        }

        &__button {
            flex: 1;
        }

        &__summary {
            flex-direction: column;
            gap: 4px;
        }
    }
}
</style>
