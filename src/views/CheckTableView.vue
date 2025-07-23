<template>
    <div class="check-table-view">
        <div class="check-table-view__header">
            <h2>チェックテーブル</h2>
            <button class="add-row-button" @click="addNewRow">行を追加</button>
        </div>
        <check-table
            v-bind:checkTableData="checkTableData"
            @row-checked="onRowChecked"
            @name-changed="onNameChanged"
            @check-all-changed="onCheckAllChanged"
        />
        <div class="check-table-view__summary">
            <p>総行数: {{ checkTableData.length }}</p>
            <p>選択された行数: {{ selectedCount }}</p>
        </div>
    </div>
</template>

<script lang="ts">
import CheckTable from "@/components/CheckTable.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        CheckTable,
    },
})
export default class CheckTableView extends Vue {
    private checkTableData: CheckTableData[] = [
        { id: 1, name: "チェック1", status: "完了", isChecked: false },
        { id: 2, name: "チェック2", status: "未完了", isChecked: false },
        { id: 3, name: "チェック3", status: "進行中", isChecked: false },
    ];

    // 選択状態を追跡するためのプロパティは削除
    // private selectedRows: Set<number> = new Set();

    // 選択された行数を計算（checkTableDataから直接計算）
    get selectedCount(): number {
        return this.checkTableData.filter((item) => item.isChecked).length;
    }

    // ランダムなIDを生成（既存IDとの重複を避ける）
    private generateRandomId(): number {
        let newId: number;
        const existingIds = new Set(this.checkTableData.map((item) => item.id));

        do {
            newId = Math.floor(Math.random() * 10000) + 1000;
        } while (existingIds.has(newId));

        return newId;
    }

    // ランダムな名前とステータスを生成
    private generateRandomData(): { name: string; status: string } {
        const names = [
            "新しいタスク",
            "レビュー作業",
            "テスト実行",
            "ドキュメント作成",
            "バグ修正",
            "機能実装",
            "データ分析",
            "会議準備",
            "設計書作成",
            "デプロイ作業",
        ];
        const statuses = ["完了", "未完了", "進行中", "保留", "確認中"];

        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomStatus =
            statuses[Math.floor(Math.random() * statuses.length)];

        return { name: randomName, status: randomStatus };
    }

    // 新しい行を追加
    addNewRow(): void {
        const newId = this.generateRandomId();
        const { name, status } = this.generateRandomData();

        const newRow: CheckTableData = {
            id: newId,
            name: `${name} ${newId}`,
            status: status,
            isChecked: false, // 追加
        };

        this.checkTableData.push(newRow);
        console.log(`新しい行を追加しました:`, newRow);
    }

    // 行のチェック状態が変更されたときの処理
    onRowChecked(data: { id: number; isChecked: boolean }): void {
        console.log("🟢 CheckTableView: 行チェック状態変更受信:", data);
        const item = this.checkTableData.find((item) => item.id === data.id);
        if (item) {
            item.isChecked = data.isChecked;
        }
        console.log(
            `🟢 CheckTableView: 行 ${data.id} のチェック状態: ${data.isChecked}`
        );
        console.log(
            `🟢 CheckTableView: 現在選択されている行数: ${this.selectedCount}`
        );
        console.log(
            "🟢 CheckTableView: 選択されている行:",
            this.checkTableData
                .filter((item) => item.isChecked)
                .map((item) => item.id)
        );
    }

    // 名前が変更されたときの処理（新しく追加）
    onNameChanged(data: { id: number; name: string }): void {
        console.log("🟢 CheckTableView: 名前変更受信:", data);
        const item = this.checkTableData.find((item) => item.id === data.id);
        if (item) {
            item.name = data.name;
        }
        console.log(
            `🟢 CheckTableView: 行 ${data.id} の名前を "${data.name}" に更新`
        );
    }

    // 全選択チェックボックスの状態が変更されたときの処理
    onCheckAllChanged(isChecked: boolean): void {
        console.log("🟢 CheckTableView: 全選択状態変更受信:", isChecked);
        this.checkTableData.forEach((item) => {
            item.isChecked = isChecked;
        });
        console.log(
            `🟢 CheckTableView: 全選択状態: ${isChecked}, 選択行数: ${this.selectedCount}`
        );
        console.log(
            "🟢 CheckTableView: 選択されている行:",
            this.checkTableData
                .filter((item) => item.isChecked)
                .map((item) => item.id)
        );
    }
}

export type CheckTableData = {
    id: number;
    name: string;
    status: string;
    isChecked: boolean; // 追加
};
</script>

<style lang="scss" scoped>
.check-table-view {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        padding-bottom: 16px;
        border-bottom: 2px solid #e9ecef;

        h2 {
            margin: 0;
            color: #333;
            font-size: 24px;
            font-weight: 600;
        }
    }

    &__summary {
        margin-top: 20px;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #e9ecef;

        p {
            margin: 8px 0;
            font-size: 14px;
            color: #6c757d;

            &:first-child {
                margin-top: 0;
            }

            &:last-child {
                margin-bottom: 0;
            }
        }
    }
}

.add-row-button {
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #0056b3;
        transform: translateY(-1px);
        box-shadow: 0 2px 4px rgba(0, 123, 255, 0.25);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 1px 2px rgba(0, 123, 255, 0.25);
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
}

@media (max-width: 768px) {
    .check-table-view {
        padding: 16px;

        &__header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;

            h2 {
                font-size: 20px;
            }
        }
    }

    .add-row-button {
        width: 100%;
        padding: 12px 20px;
    }
}
</style>
