<template>
    <div class="data-selection-view">
        <header class="view-header">
            <h2 class="header-title">データ選択</h2>
        </header>

        <div class="content-area">
            <DataTable
                :items="tableData"
                :selected-id="selectedItemId"
                @selection-change="handleSelectionChange"
            />

            <div class="action-area">
                <ActionButton
                    label="選択を確定"
                    :disabled="!selectedItemId"
                    @click="handleConfirm"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import DataTable from "@/components/DataTable.vue";
import { TableItem } from "@/types/common";
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        DataTable,
        ActionButton,
    },
})
export default class MySampleView extends Vue {
    selectedItemId: number | null = null;

    tableData: TableItem[] = [
        { id: 1, name: "データ項目1", category: "カテゴリA", status: "有効" },
        { id: 2, name: "データ項目2", category: "カテゴリB", status: "有効" },
        { id: 3, name: "データ項目3", category: "カテゴリA", status: "無効" },
        { id: 4, name: "データ項目4", category: "カテゴリC", status: "有効" },
        { id: 5, name: "データ項目5", category: "カテゴリB", status: "有効" },
    ];

    handleSelectionChange(itemId: number | null): void {
        this.selectedItemId = itemId;
    }

    handleConfirm(): void {
        if (this.selectedItemId) {
            const selectedItem = this.tableData.find(
                (item) => item.id === this.selectedItemId
            );
            console.log("選択されたアイテム:", selectedItem);
            // 実際のプロジェクトでは、親コンポーネントへのイベント発火や
            // Vuexでの状態管理、APIコールなどを行う
            this.$emit("item-confirmed", selectedItem);
        }
    }
}
</script>

<style lang="scss" scoped>
.data-selection-view {
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .view-header {
        background-color: #ff0000;
        color: #000;
        padding: 12px 20px;
        border-bottom: 1px solid #ddd;

        .header-title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }
    }

    .content-area {
        padding: 20px;

        .action-area {
            margin-top: 16px;
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>
