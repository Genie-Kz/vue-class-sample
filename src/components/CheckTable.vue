<template>
    <div class="check-table-wrapper">
        <table class="check-table">
            <check-table-row
                :isHeader="true"
                v-bind:isCheckedAll="isCheckedAll"
                v-on:check-all-changed="onCheckAllChanged"
            />
            <tbody>
                <check-table-row
                    v-for="item in checkTableData"
                    :key="item.id"
                    :checkTableData="item"
                    @row-checked="onRowChecked"
                    @name-changed="onNameChanged"
                />
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { CheckTableData } from "@/views/CheckTableView.vue";
import { Component, Prop, Vue } from "vue-property-decorator";
import CheckTableRow from "./CheckTableRow.vue";

@Component({
    components: {
        CheckTableRow,
    },
})
export default class CheckTable extends Vue {
    @Prop() checkTableData!: CheckTableData[];

    // 全選択状態を計算
    get isCheckedAll(): boolean {
        return (
            this.checkTableData.length > 0 &&
            this.checkTableData.every((item) => item.isChecked)
        );
    }

    // 全選択チェックボックスの状態が変更されたときの処理
    onCheckAllChanged(isChecked: boolean): void {
        console.log("🔵 CheckTable: 全選択変更:", isChecked);
        this.$emit("check-all-changed", isChecked);
    }

    // 個別行のチェック状態が変更されたときの処理
    onRowChecked(data: { id: number; isChecked: boolean }): void {
        console.log("🔵 CheckTable: 行チェック変更:", data);
        this.$emit("row-checked", data);
    }

    // 名前変更イベント
    onNameChanged(data: { id: number; name: string }): void {
        console.log("🔵 CheckTable: 名前変更:", data);
        this.$emit("name-changed", data);
    }
}
</script>

<style lang="scss" scoped>
.check-table {
    width: 100%;
    border-collapse: collapse;
}

.check-table-wrapper {
    display: flex;
    flex-direction: column;
}
</style>
