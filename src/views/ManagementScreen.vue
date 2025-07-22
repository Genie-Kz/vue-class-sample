<template>
    <div class="management-screen">
        <!-- ヘッダー -->
        <header class="management-screen__header">
            <h1 class="management-screen__title">標準プラン価格設定画面</h1>
            <div class="management-screen__status">
                <span
                    :class="[
                        'status-indicator',
                        { 'status-indicator--changed': hasChanges },
                    ]"
                >
                    {{ hasChanges ? "変更あり" : "保存済み" }}
                </span>
            </div>
        </header>

        <!-- メインコンテンツ -->
        <div class="management-screen__content">
            <!-- 製品情報セクション -->
            <section class="management-screen__section">
                <ProductInfoTable
                    :products="appData.products"
                    @products-updated="onProductsUpdated"
                    @data-saved="onDataSaved"
                />
            </section>

            <!-- 料金設定セクション -->
            <section class="management-screen__section">
                <PriceSettingTable
                    :price-info="appData.priceInfo"
                    :total-amount="appData.totalAmount"
                    @price-updated="onPriceUpdated"
                    @data-saved="onDataSaved"
                />
            </section>

            <!-- 操作ボタン -->
            <section class="management-screen__actions">
                <button
                    @click="resetData"
                    class="management-screen__button management-screen__button--secondary"
                    :disabled="!hasChanges"
                >
                    リセット
                </button>
                <button
                    @click="saveAllData"
                    class="management-screen__button management-screen__button--primary"
                    :disabled="!hasChanges"
                >
                    全て保存
                </button>
            </section>

            <!-- ログ表示 -->
            <section class="management-screen__log">
                <h3>操作ログ</h3>
                <div class="log-container">
                    <div
                        v-for="(log, index) in operationLogs"
                        :key="index"
                        class="log-item"
                    >
                        <span class="log-time">{{ log.timestamp }}</span>
                        <span class="log-message">{{ log.message }}</span>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
import PriceSettingTable from "@/components/PriceSettingTable.vue";
import ProductInfoTable from "@/components/ProductInfoTable.vue";
import { AppData, PriceInfo, Product } from "@/types/management";
import { Component, Vue } from "vue-property-decorator";

interface OperationLog {
    timestamp: string;
    message: string;
}

@Component({
    components: {
        ProductInfoTable,
        PriceSettingTable,
    },
})
export default class ManagementScreen extends Vue {
    // アプリケーション全体のデータ（トップレベルで管理）
    appData: AppData = {
        products: [
            {
                id: 1,
                serialNo: "ABCDEFG",
                individualNo: "123456789",
                category: "標準",
                price: 1000,
                status: "有効",
            },
            {
                id: 2,
                serialNo: "HIJKLMN",
                individualNo: "987654321",
                category: "プレミアム",
                price: 2000,
                status: "有効",
            },
        ],
        priceInfo: [
            {
                id: 1,
                priceA: 1000,
                priceB: 1500,
                priceC: 2000,
                priceD: 2500,
                priceE: 3000,
                priceF: 3500,
                priceG: 4000,
                priceH: 4500,
            },
        ],
        totalAmount: 1919810,
        lastUpdated: "",
    };

    operationLogs: OperationLog[] = [];
    originalData: AppData = {} as AppData;

    mounted() {
        // 初期データのバックアップを作成
        this.originalData = JSON.parse(JSON.stringify(this.appData));
        this.addLog("システムを開始しました");
    }

    get hasChanges(): boolean {
        return (
            JSON.stringify(this.appData) !== JSON.stringify(this.originalData)
        );
    }

    // 子コンポーネント（ProductInfoTable）からのデータ更新
    onProductsUpdated(products: Product[]) {
        this.appData = {
            ...this.appData,
            products: [...products],
        };
        this.addLog(`製品情報が更新されました（${products.length}件）`);
    }

    // 子コンポーネント（PriceSettingTable）からの料金更新
    onPriceUpdated(priceInfo: PriceInfo[], totalAmount: number) {
        this.appData = {
            ...this.appData,
            priceInfo: [...priceInfo],
            totalAmount,
        };
        this.addLog(
            `料金情報が更新されました（合計: ¥${totalAmount.toLocaleString()}）`
        );
    }

    // 子コンポーネントからの保存完了通知
    onDataSaved(message: string) {
        this.appData.lastUpdated = new Date().toLocaleString("ja-JP");
        this.addLog(`保存完了: ${message}`);
    }

    // 全データの保存
    saveAllData() {
        // 実際のAPIコール等をここで実行
        this.originalData = JSON.parse(JSON.stringify(this.appData));
        this.appData.lastUpdated = new Date().toLocaleString("ja-JP");
        this.addLog("全てのデータを保存しました");

        // 保存完了をユーザーに通知
        alert("データを保存しました");
    }

    // データのリセット
    resetData() {
        if (confirm("変更内容を破棄してリセットしますか？")) {
            this.appData = JSON.parse(JSON.stringify(this.originalData));
            this.addLog("データをリセットしました");
        }
    }

    // 操作ログの追加
    addLog(message: string) {
        const log: OperationLog = {
            timestamp: new Date().toLocaleString("ja-JP"),
            message,
        };
        this.operationLogs.unshift(log);

        // ログの数を制限
        if (this.operationLogs.length > 10) {
            this.operationLogs = this.operationLogs.slice(0, 10);
        }
    }
}
</script>

<style lang="scss" scoped>
.management-screen {
    min-height: 100vh;
    background: #f5f5f5;

    &__header {
        background: #a20025;
        color: white;
        padding: 16px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    &__title {
        margin: 0;
        font-size: 24px;
        font-weight: 600;
    }

    &__status {
        display: flex;
        align-items: center;
    }

    &__content {
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }

    &__section {
        margin-bottom: 30px;
    }

    &__actions {
        display: flex;
        gap: 16px;
        justify-content: center;
        margin: 30px 0;
        padding: 20px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
    }

    &__button {
        padding: 12px 24px;
        border: none;
        border-radius: 6px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
        min-width: 120px;

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &--primary {
            background: #007bff;
            color: white;

            &:hover:not(:disabled) {
                background: #0056b3;
            }
        }

        &--secondary {
            background: #6c757d;
            color: white;

            &:hover:not(:disabled) {
                background: #545b62;
            }
        }
    }

    &__log {
        background: white;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        h3 {
            margin: 0 0 16px 0;
            color: #333;
        }
    }
}

.status-indicator {
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    background: #28a745;
    color: white;

    &--changed {
        background: #ffc107;
        color: #212529;
    }
}

.log-container {
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 12px;
    background: #f8f9fa;
}

.log-item {
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
    font-size: 14px;

    &:last-child {
        margin-bottom: 0;
    }
}

.log-time {
    color: #6c757d;
    font-weight: 500;
    min-width: 120px;
}

.log-message {
    color: #333;
}

@media (max-width: 768px) {
    .management-screen {
        &__header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
        }

        &__content {
            padding: 16px;
        }

        &__actions {
            flex-direction: column;
        }

        &__button {
            width: 100%;
        }
    }
}
</style>
