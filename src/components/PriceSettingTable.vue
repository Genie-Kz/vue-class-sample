<template>
    <div class="price-setting-table">
        <div class="price-setting-table__header">
            <h3 class="price-setting-table__title">料金設定</h3>
            <div class="price-setting-table__summary">
                <span class="total-amount"
                    >合計金額: ¥{{ totalAmount.toLocaleString() }}</span
                >
            </div>
        </div>

        <EditableTable
            title="料金テーブル"
            :columns="columns"
            :data="priceInfo"
            @data-updated="onDataUpdated"
            @row-added="onRowAdded"
            @row-deleted="onRowDeleted"
            @data-saved="onDataSaved"
        />

        <!-- 計算結果表示 -->
        <div class="price-calculation">
            <div class="calculation-item">
                <span class="calculation-label">平均料金:</span>
                <span class="calculation-value"
                    >¥{{ averagePrice.toLocaleString() }}</span
                >
            </div>
            <div class="calculation-item">
                <span class="calculation-label">最高料金:</span>
                <span class="calculation-value"
                    >¥{{ maxPrice.toLocaleString() }}</span
                >
            </div>
            <div class="calculation-item">
                <span class="calculation-label">最低料金:</span>
                <span class="calculation-value"
                    >¥{{ minPrice.toLocaleString() }}</span
                >
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import EditableTable, { TableColumn } from "@/components/EditableTable.vue";
import { PriceInfo } from "@/types/management";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {
        EditableTable,
    },
})
export default class PriceSettingTable extends Vue {
    @Prop({ required: true }) priceInfo!: PriceInfo[];
    @Prop({ required: true }) totalAmount!: number;

    get columns(): TableColumn[] {
        return [
            {
                key: "priceA",
                label: "料金A",
                type: "number",
                placeholder: "0",
            },
            {
                key: "priceB",
                label: "料金B",
                type: "number",
                placeholder: "0",
            },
            {
                key: "priceC",
                label: "料金C",
                type: "number",
                placeholder: "0",
            },
            {
                key: "priceD",
                label: "料金D",
                type: "number",
                placeholder: "0",
            },
            {
                key: "priceE",
                label: "料金E",
                type: "number",
                placeholder: "0",
            },
            {
                key: "priceF",
                label: "料金F",
                type: "number",
                placeholder: "0",
            },
            {
                key: "priceG",
                label: "料金G",
                type: "number",
                placeholder: "0",
            },
            {
                key: "priceH",
                label: "料金H",
                type: "number",
                placeholder: "0",
            },
        ];
    }

    get averagePrice(): number {
        if (this.priceInfo.length === 0) return 0;

        const total = this.priceInfo.reduce((sum, item) => {
            return (
                sum +
                item.priceA +
                item.priceB +
                item.priceC +
                item.priceD +
                item.priceE +
                item.priceF +
                item.priceG +
                item.priceH
            );
        }, 0);

        return Math.round(total / (this.priceInfo.length * 8));
    }

    get maxPrice(): number {
        if (this.priceInfo.length === 0) return 0;

        let max = 0;
        this.priceInfo.forEach((item) => {
            const prices = [
                item.priceA,
                item.priceB,
                item.priceC,
                item.priceD,
                item.priceE,
                item.priceF,
                item.priceG,
                item.priceH,
            ];
            const itemMax = Math.max(...prices);
            if (itemMax > max) max = itemMax;
        });

        return max;
    }

    get minPrice(): number {
        if (this.priceInfo.length === 0) return 0;

        let min = Number.MAX_VALUE;
        this.priceInfo.forEach((item) => {
            const prices = [
                item.priceA,
                item.priceB,
                item.priceC,
                item.priceD,
                item.priceE,
                item.priceF,
                item.priceG,
                item.priceH,
            ];
            const itemMin = Math.min(...prices);
            if (itemMin < min) min = itemMin;
        });

        return min === Number.MAX_VALUE ? 0 : min;
    }

    calculateTotal(data: PriceInfo[]): number {
        return data.reduce((sum, item) => {
            return (
                sum +
                item.priceA +
                item.priceB +
                item.priceC +
                item.priceD +
                item.priceE +
                item.priceF +
                item.priceG +
                item.priceH
            );
        }, 0);
    }

    onDataUpdated(updatedData: PriceInfo[]) {
        const newTotal = this.calculateTotal(updatedData);

        // 親コンポーネント（ManagementScreen）にデータの変更を通知
        this.$emit("price-updated", updatedData, newTotal);
    }

    onRowAdded(newRow: PriceInfo) {
        console.log("新しい料金設定が追加されました:", newRow);
        // 合計金額の再計算をトリガー
        this.onDataUpdated([...this.priceInfo]);
    }

    onRowDeleted(deletedRow: PriceInfo) {
        console.log("料金設定が削除されました:", deletedRow);
        // 合計金額の再計算をトリガー
        this.onDataUpdated(
            this.priceInfo.filter((item) => item.id !== deletedRow.id)
        );
    }

    onDataSaved(data: PriceInfo[]) {
        console.log("料金データが保存されました:", data);
        this.$emit("data-saved", "料金設定を保存しました");
    }
}
</script>

<style lang="scss" scoped>
.price-setting-table {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
        padding: 16px;
        background: #f8f9fa;
        border-radius: 8px;
        border: 1px solid #ddd;
    }

    &__title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
    }

    &__summary {
        display: flex;
        align-items: center;
    }
}

.total-amount {
    font-size: 24px;
    font-weight: bold;
    color: #007bff;
}

.price-calculation {
    margin-top: 16px;
    padding: 16px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    gap: 16px;
}

.calculation-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.calculation-label {
    font-size: 14px;
    color: #6c757d;
    margin-bottom: 4px;
}

.calculation-value {
    font-size: 18px;
    font-weight: 600;
    color: #333;
}

@media (max-width: 768px) {
    .price-setting-table {
        &__header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
        }
    }

    .total-amount {
        font-size: 20px;
    }

    .price-calculation {
        flex-direction: column;
        align-items: center;
    }

    .calculation-item {
        width: 100%;
        flex-direction: row;
        justify-content: space-between;
    }
}
</style>
