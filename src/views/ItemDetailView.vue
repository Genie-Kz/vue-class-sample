<template>
    <div class="item-detail-view">
        <header class="view-header">
            <h2 class="header-title">選択アイテム詳細</h2>
        </header>

        <div class="content-area">
            <div v-if="selectedItem" class="detail-card">
                <div class="detail-row">
                    <label class="detail-label">ID:</label>
                    <span class="detail-value">{{ selectedItem.id }}</span>
                </div>
                <div class="detail-row">
                    <label class="detail-label">名前:</label>
                    <span class="detail-value">{{ selectedItem.name }}</span>
                </div>
                <div class="detail-row">
                    <label class="detail-label">カテゴリ:</label>
                    <span class="detail-value">{{
                        selectedItem.category
                    }}</span>
                </div>
                <div class="detail-row">
                    <label class="detail-label">ステータス:</label>
                    <span
                        class="detail-value status-badge"
                        :class="{
                            active: selectedItem.status === '有効',
                            inactive: selectedItem.status === '無効',
                        }"
                    >
                        {{ selectedItem.status }}
                    </span>
                </div>
            </div>

            <div v-else class="no-selection">
                <p>選択されたアイテムが見つかりません。</p>
            </div>

            <div class="action-area">
                <ActionButton
                    label="戻る"
                    variant="secondary"
                    @click="goBack"
                />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ActionButton from "@/components/ActionButton.vue";
import { TableItem } from "@/types/common";
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        ActionButton,
    },
})
export default class ItemDetailView extends Vue {
    get selectedItem(): TableItem | null {
        // ルートパラメータまたはVuexストアから選択されたアイテムを取得
        const itemData = this.$route.params.item;
        if (itemData) {
            try {
                return JSON.parse(decodeURIComponent(itemData)) as TableItem;
            } catch (error) {
                console.error("Failed to parse item data:", error);
                return null;
            }
        }
        return null;
    }

    goBack(): void {
        this.$router.push({ name: "data-selection" });
    }
}
</script>

<style lang="scss" scoped>
.item-detail-view {
    border: 1px solid #000;
    border-radius: 4px;
    background-color: #fff;
    max-width: 600px;
    margin: 0 auto;

    .view-header {
        background-color: #ff0000;
        color: #000;
        padding: 12px 20px;
        border-bottom: 1px solid #000;

        .header-title {
            margin: 0;
            font-size: 18px;
            font-weight: 600;
        }
    }

    .content-area {
        padding: 20px;

        .detail-card {
            border: 1px solid #000;
            border-radius: 4px;
            padding: 20px;
            margin-bottom: 20px;

            .detail-row {
                display: flex;
                align-items: center;
                margin-bottom: 12px;

                &:last-child {
                    margin-bottom: 0;
                }

                .detail-label {
                    font-weight: 600;
                    min-width: 100px;
                    color: #333;
                }

                .detail-value {
                    color: #666;
                    font-weight: 500;

                    &.status-badge {
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
        }

        .no-selection {
            text-align: center;
            padding: 40px 20px;
            color: #666;

            p {
                margin: 0;
                font-size: 16px;
            }
        }

        .action-area {
            display: flex;
            justify-content: flex-start;
        }
    }
}
</style>
