<template>
    <div class="product-info-table">
        <EditableTable
            title="製品情報"
            :columns="columns"
            :data="products"
            @data-updated="onDataUpdated"
            @row-added="onRowAdded"
            @row-deleted="onRowDeleted"
            @data-saved="onDataSaved"
        />
    </div>
</template>

<script lang="ts">
import EditableTable, { TableColumn } from "@/components/EditableTable.vue";
import { Product } from "@/types/management";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {
        EditableTable,
    },
})
export default class ProductInfoTable extends Vue {
    @Prop({ required: true }) products!: Product[];

    get columns(): TableColumn[] {
        return [
            {
                key: "serialNo",
                label: "シリアルNo",
                type: "text",
                placeholder: "例: ABCDEFG",
            },
            {
                key: "individualNo",
                label: "個別No",
                type: "text",
                placeholder: "例: 123456789",
            },
            {
                key: "category",
                label: "カテゴリー",
                type: "select",
                options: [
                    { value: "標準", label: "標準" },
                    { value: "プレミアム", label: "プレミアム" },
                    { value: "エコノミー", label: "エコノミー" },
                ],
            },
            {
                key: "price",
                label: "価格",
                type: "number",
                placeholder: "0",
            },
            {
                key: "status",
                label: "ステータス",
                type: "select",
                options: [
                    { value: "有効", label: "有効" },
                    { value: "無効", label: "無効" },
                    { value: "保留", label: "保留" },
                ],
            },
        ];
    }

    onDataUpdated(updatedData: Product[]) {
        // 親コンポーネント（ManagementScreen）にデータの変更を通知
        this.$emit("products-updated", updatedData);
    }

    onRowAdded(newRow: Product) {
        console.log("新しい製品が追加されました:", newRow);
        // 追加のロジックがあればここに記述
    }

    onRowDeleted(deletedRow: Product) {
        console.log("製品が削除されました:", deletedRow);
        // 削除のロジックがあればここに記述
    }

    onDataSaved(data: Product[]) {
        console.log("製品データが保存されました:", data);
        this.$emit("data-saved", "製品情報を保存しました");
    }
}
</script>

<style lang="scss" scoped>
.product-info-table {
    margin-bottom: 20px;
}
</style>
