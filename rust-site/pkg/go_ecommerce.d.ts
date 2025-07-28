/* tslint:disable */
/* eslint-disable */
export class CartItem {
  private constructor();
  free(): void;
  static new(id: number, name: string, price: number, quantity: number): CartItem;
  get_id(): number;
  get_name(): string;
  get_price(): number;
  get_quantity(): number;
}
export class GoGame {
  free(): void;
  constructor();
  place_stone(row: number, col: number): boolean;
  pass(): void;
  is_game_over(): boolean;
  get_board(): Int32Array;
  get_current_player(): number;
  get_captures(): Uint32Array;
}
export class ShoppingCart {
  free(): void;
  constructor();
  add_item(id: number, name: string, price: number, quantity: number): void;
  get_total(): number;
  get_items(): CartItem[];
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_cartitem_free: (a: number, b: number) => void;
  readonly cartitem_new: (a: number, b: number, c: number, d: number, e: number) => number;
  readonly cartitem_get_id: (a: number) => number;
  readonly cartitem_get_name: (a: number) => [number, number];
  readonly cartitem_get_price: (a: number) => number;
  readonly cartitem_get_quantity: (a: number) => number;
  readonly __wbg_shoppingcart_free: (a: number, b: number) => void;
  readonly shoppingcart_new: () => number;
  readonly shoppingcart_add_item: (a: number, b: number, c: number, d: number, e: number, f: number) => void;
  readonly shoppingcart_get_total: (a: number) => number;
  readonly shoppingcart_get_items: (a: number) => [number, number];
  readonly __wbg_gogame_free: (a: number, b: number) => void;
  readonly gogame_new: () => number;
  readonly gogame_place_stone: (a: number, b: number, c: number) => [number, number, number];
  readonly gogame_pass: (a: number) => void;
  readonly gogame_is_game_over: (a: number) => number;
  readonly gogame_get_board: (a: number) => [number, number];
  readonly gogame_get_current_player: (a: number) => number;
  readonly gogame_get_captures: (a: number) => [number, number];
  readonly __wbindgen_export_0: WebAssembly.Table;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __externref_drop_slice: (a: number, b: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
