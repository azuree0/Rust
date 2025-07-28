/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export const __wbg_cartitem_free: (a: number, b: number) => void;
export const cartitem_new: (a: number, b: number, c: number, d: number, e: number) => number;
export const cartitem_get_id: (a: number) => number;
export const cartitem_get_name: (a: number) => [number, number];
export const cartitem_get_price: (a: number) => number;
export const cartitem_get_quantity: (a: number) => number;
export const __wbg_shoppingcart_free: (a: number, b: number) => void;
export const shoppingcart_new: () => number;
export const shoppingcart_add_item: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
export const shoppingcart_get_total: (a: number) => number;
export const shoppingcart_get_items: (a: number) => [number, number];
export const __wbg_gogame_free: (a: number, b: number) => void;
export const gogame_new: () => number;
export const gogame_place_stone: (a: number, b: number, c: number) => [number, number, number];
export const gogame_pass: (a: number) => void;
export const gogame_is_game_over: (a: number) => number;
export const gogame_get_board: (a: number) => [number, number];
export const gogame_get_current_player: (a: number) => number;
export const gogame_get_captures: (a: number) => [number, number];
export const __wbindgen_export_0: WebAssembly.Table;
export const __wbindgen_malloc: (a: number, b: number) => number;
export const __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
export const __wbindgen_free: (a: number, b: number, c: number) => void;
export const __externref_drop_slice: (a: number, b: number) => void;
export const __externref_table_dealloc: (a: number) => void;
export const __wbindgen_start: () => void;
