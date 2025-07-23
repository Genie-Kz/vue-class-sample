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
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({
    components: {
        EditableTable,
    },
})
export default class ProductInfoTable extends Vue {
    @Prop({ required: true }) products!: Product[];

    // @Emitデコレータを使用したイベント発行メソッド
    // 親コンポーネントで @products-updated="handler" として受け取れる
    @Emit("products-updated")
    emitProductsUpdated(products: Product[]) {
        return products;
    }

    // 親コンポーネントで @data-saved="handler" として受け取れる
    @Emit("data-saved")
    emitDataSaved(message: string) {
        return message;
    }

    // 新しい製品追加イベント
    @Emit("product-added")
    emitProductAdded(product: Product) {
        return product;
    }

    // 製品削除イベント
    @Emit("product-deleted")
    emitProductDeleted(product: Product) {
        return product;
    }

    // 製品数変更イベント
    @Emit("products-count-changed")
    emitProductsCountChanged(count: number) {
        return count;
    }

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
        this.emitProductsUpdated(updatedData);
        this.emitProductsCountChanged(updatedData.length);
    }

    onRowAdded(newRow: Product) {
        console.log("新しい製品が追加されました:", newRow);
        // @Emitデコレータを使用してイベントを発行
        this.emitProductAdded(newRow);
        // 追加のロジックがあればここに記述
    }

    onRowDeleted(deletedRow: Product) {
        console.log("製品が削除されました:", deletedRow);
        // @Emitデコレータを使用してイベントを発行
        this.emitProductDeleted(deletedRow);
        // 削除のロジックがあればここに記述
    }

    onDataSaved(data: Product[]) {
        console.log("製品データが保存されました:", data);
        this.emitDataSaved("製品情報を保存しました");
    }
}
</script>

<style lang="scss" scoped>
.product-info-table {
    margin-bottom: 20px;
}
</style>
