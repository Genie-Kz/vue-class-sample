<template>
    <thead v-if="isHeader">
        <tr>
            <th class="check-table__header" style="width: 50px">
                <input
                    type="checkbox"
                    :checked="isCheckedAll"
                    @change="onCheckAllChange"
                />
            </th>
            <th class="check-table__header">ID</th>
            <th class="check-table__header">名前</th>
            <th class="check-table__header">ステータス</th>
        </tr>
    </thead>
    <tr v-else>
        <td class="check-table__cell">
            <input
                type="checkbox"
                v-model="checkTableData.isChecked"
                v-on:change="onChange"
            />
        </td>
        <td class="check-table__cell">{{ checkTableData.id }}</td>
        <td class="check-table__cell">
            <!-- 編集可能とする-->
            <span>{{ checkTableData.name }}</span>
            <input
                type="text"
                :value="checkTableData.name"
                @change="onNameChange"
            />
        </td>
        <td class="check-table__cell">{{ checkTableData.status }}</td>
    </tr>
</template>

<script lang="ts">
import { CheckTableData } from "@/views/CheckTableView.vue";
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class CheckTableRow extends Vue {
    @Prop({ default: false }) private isHeader?: boolean;

    @Prop() private checkTableData!: CheckTableData;

    @Prop({ default: false }) private isCheckedAll?: boolean;

    @Emit("row-checked")
    private onChange(e: Event) {
        const isChecked = (e.target as HTMLInputElement).checked;
        console.log("🟡 CheckTableRow: 個別行チェック変更:", {
            id: this.checkTableData.id,
            isChecked,
        });
        return { id: this.checkTableData.id, isChecked };
    }

    @Emit("check-all-changed")
    private onCheckAllChange(e: Event) {
        const isChecked = (e.target as HTMLInputElement).checked;
        console.log("🟡 CheckTableRow: 全選択チェック変更:", isChecked);
        return isChecked;
    }

    @Emit("name-changed")
    private onNameChange(e: Event) {
        const name = (e.target as HTMLInputElement).value;
        console.log("🟡 CheckTableRow: 名前変更:", {
            id: this.checkTableData.id,
            name,
        });
        return { id: this.checkTableData.id, name };
    }
}
</script>

<style lang="scss" scoped>
.check-table__header {
    background-color: #f2f2f2;
}

.check-table__cell {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
</style>
