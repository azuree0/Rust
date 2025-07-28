use wasm_bindgen::prelude::*;
use std::collections::HashSet;

#[derive(Clone, Copy, PartialEq)]
pub enum Stone {
    Empty,
    Black,
    White,
}

pub struct GoBoard {
    board: [[Stone; 9]; 9],
    current_player: Stone,
    ko_point: Option<(usize, usize)>,
    black_captures: u32,
    white_captures: u32,
    passes: u32,
}

impl GoBoard {
    pub fn new() -> Self {
        GoBoard {
            board: [[Stone::Empty; 9]; 9],
            current_player: Stone::Black,
            ko_point: None,
            black_captures: 0,
            white_captures: 0,
            passes: 0,
        }
    }

    pub fn place_stone(&mut self, row: usize, col: usize) -> Result<bool, String> {
        if row >= 9 || col >= 9 || self.board[row][col] != Stone::Empty {
            return Err("Invalid move: Position occupied or out of bounds".to_string());
        }

        // Temporarily place the stone
        let stone = self.current_player;
        self.board[row][col] = stone;

        // Check for captures
        let opponent = if stone == Stone::Black { Stone::White } else { Stone::Black };
        let mut captured = vec![];
        for &(r, c) in &[(row.wrapping_sub(1), col), (row+1, col), (row, col.wrapping_sub(1)), (row, col+1)] {
            if r < 9 && c < 9 && self.board[r][c] == opponent {
                if !self.has_liberties(r, c) {
                    captured.extend(self.remove_group(r, c));
                }
            }
        }

        // Check if the move is valid (has liberties or captures)
        if captured.is_empty() && !self.has_liberties(row, col) {
            self.board[row][col] = Stone::Empty;
            return Err("Invalid move: No liberties and no captures".to_string());
        }

        // Check ko rule
        if let Some((kr, kc)) = self.ko_point {
            if captured.len() == 1 && captured.contains(&(kr, kc)) {
                self.board[row][col] = Stone::Empty;
                return Err("Invalid move: Violates ko rule".to_string());
            }
        }

        // Update ko point if exactly one stone was captured
        self.ko_point = if captured.len() == 1 { Some((row, col)) } else { None };

        // Update capture counts
        if stone == Stone::Black {
            self.white_captures += captured.len() as u32;
        } else {
            self.black_captures += captured.len() as u32;
        }

        // Switch player
        self.current_player = if stone == Stone::Black { Stone::White } else { Stone::Black };
        self.passes = 0;
        Ok(true)
    }

    fn has_liberties(&self, row: usize, col: usize) -> bool {
        let stone = self.board[row][col];
        if stone == Stone::Empty {
            return false;
        }
        let mut visited = HashSet::new();
        self.check_liberties(row, col, stone, &mut visited)
    }

    fn check_liberties(&self, row: usize, col: usize, stone: Stone, visited: &mut HashSet<(usize, usize)>) -> bool {
        if visited.contains(&(row, col)) {
            return false;
        }
        visited.insert((row, col));
        for &(r, c) in &[(row.wrapping_sub(1), col), (row+1, col), (row, col.wrapping_sub(1)), (row, col+1)] {
            if r < 9 && c < 9 {
                if self.board[r][c] == Stone::Empty {
                    return true;
                }
                if self.board[r][c] == stone && self.check_liberties(r, c, stone, visited) {
                    return true;
                }
            }
        }
        false
    }

    fn remove_group(&mut self, row: usize, col: usize) -> Vec<(usize, usize)> {
        let stone = self.board[row][col];
        let mut group = vec![];
        let mut stack = vec![(row, col)];
        while let Some((r, c)) = stack.pop() {
            if self.board[r][c] != stone {
                continue;
            }
            group.push((r, c));
            self.board[r][c] = Stone::Empty;
            for &(nr, nc) in &[(r.wrapping_sub(1), c), (r+1, c), (r, c.wrapping_sub(1)), (r, c+1)] {
                if nr < 9 && nc < 9 && self.board[nr][nc] == stone {
                    stack.push((nr, nc));
                }
            }
        }
        group
    }

    pub fn pass(&mut self) {
        self.current_player = if self.current_player == Stone::Black { Stone::White } else { Stone::Black };
        self.passes += 1;
        self.ko_point = None;
    }

    pub fn is_game_over(&self) -> bool {
        self.passes >= 2
    }

    pub fn get_board(&self) -> Vec<i32> {
        self.board.iter().flatten().map(|&s| match s {
            Stone::Empty => 0,
            Stone::Black => 1,
            Stone::White => 2,
        }).collect()
    }

    pub fn get_current_player(&self) -> i32 {
        match self.current_player {
            Stone::Black => 1,
            Stone::White => 2,
            Stone::Empty => 0,
        }
    }

    pub fn get_captures(&self) -> (u32, u32) {
        (self.black_captures, self.white_captures)
    }
}

#[wasm_bindgen]
pub struct GoGame {
    board: GoBoard,
}

#[wasm_bindgen]
impl GoGame {
    #[wasm_bindgen(constructor)]
    pub fn new() -> GoGame {
        GoGame { board: GoBoard::new() }
    }

    pub fn place_stone(&mut self, row: usize, col: usize) -> Result<bool, JsValue> {
        self.board.place_stone(row, col).map_err(|e| JsValue::from_str(&e))
    }

    pub fn pass(&mut self) {
        self.board.pass();
    }

    pub fn is_game_over(&self) -> bool {
        self.board.is_game_over()
    }

    pub fn get_board(&self) -> Vec<i32> {
        self.board.get_board()
    }

    pub fn get_current_player(&self) -> i32 {
        self.board.get_current_player()
    }

    pub fn get_captures(&self) -> Vec<u32> {
        let (black, white) = self.board.get_captures();
        vec![black, white]
    }
}