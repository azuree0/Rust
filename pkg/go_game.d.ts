/* tslint:disable */
/* eslint-disable */
export class GoGame {
  free(): void;
  constructor();
  place_stone(x: number, y: number): boolean;
  pass_turn(): void;
  get_board_state(x: number, y: number): number;
  current_player(): number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_gogame_free: (a: number, b: number) => void;
  readonly gogame_new: () => number;
  readonly gogame_place_stone: (a: number, b: number, c: number) => number;
  readonly gogame_pass_turn: (a: number) => void;
  readonly gogame_get_board_state: (a: number, b: number, c: number) => number;
  readonly gogame_current_player: (a: number) => number;
  readonly __wbindgen_export_0: WebAssembly.Table;
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
