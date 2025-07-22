// 製品情報の型定義
export interface Product {
    id: number;
    serialNo: string;
    individualNo: string;
    category: string;
    price: number;
    status: string;
}

// 料金情報の型定義
export interface PriceInfo {
    id: number;
    priceA: number;
    priceB: number;
    priceC: number;
    priceD: number;
    priceE: number;
    priceF: number;
    priceG: number;
    priceH: number;
}

// アプリケーション全体で使用する共通の型
export interface AppData {
    products: Product[];
    priceInfo: PriceInfo[];
    totalAmount: number;
    lastUpdated: string;
}

// フォームの状態を管理する型
export interface FormState {
    isEditing: boolean;
    hasChanges: boolean;
    validationErrors: string[];
}
