/**
 * データ選択機能で使用する共通の型定義
 */

export interface TableItem {
    id: number;
    name: string;
    category: string;
    status: string;
}

export interface SelectionChangeEvent {
    selectedId: number | null;
    selectedItem: TableItem | null;
}

export interface ConfirmationEvent {
    selectedItem: TableItem;
    timestamp: Date;
}

// ボタンコンポーネントの型定義
export type ButtonVariant = "primary" | "secondary" | "danger";
export type ButtonSize = "small" | "medium" | "large";

// テーブルの表示設定
export interface TableColumn {
    key: string;
    label: string;
    width?: string;
    align?: "left" | "center" | "right";
    sortable?: boolean;
}

// 共通のプロパティ
export interface BaseComponentProps {
    disabled?: boolean;
    loading?: boolean;
    variant?: ButtonVariant;
    size?: ButtonSize;
}
