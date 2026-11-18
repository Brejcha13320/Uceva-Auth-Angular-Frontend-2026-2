import { Theme } from "./theme.interface";

export interface ButtonConfig {
    id: string;
    type: ButtonType;
    title?: string;
    icon?: string;
    outline?: boolean;
    size?: ButtonSize;
}

export type ButtonSize = 'lg' | 'sm';

export type ButtonType = Theme;