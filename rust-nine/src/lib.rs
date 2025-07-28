use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct GoGame {
    board: [[u8; 9]; 9], // 0: empty, 1: black, 2: white
    current_player: u8,  // 1: black, 2: white
}

#[wasm_bindgen]
impl GoGame {
    #[wasm_bindgen(constructor)]
    pub fn new() -> GoGame {
        GoGame {
            board: [[0; 9]; 9],
            current_player: 1,
        }
    }

    pub fn place_stone(&mut self, x: usize, y: usize) -> bool {
        if x >= 9 || y >= 9 || self.board[y][x] != 0 {
            return false;
        }

        // Place the stone
        self.board[y][x] = self.current_player;

        // Check for captures
        let opponent = if self.current_player == 1 { 2 } else { 1 };
        let mut captured = false;
        let directions = [(-1, 0), (1, 0), (0, -1), (0, 1)];

        for &(dx, dy) in directions.iter() {
            let nx = x as i32 + dx;
            let ny = y as i32 + dy;
            if nx >= 0 && nx < 9 && ny >= 0 && ny < 9 && self.board[ny as usize][nx as usize] == opponent {
                if !self.has_liberties(nx as usize, ny as usize, opponent, &mut vec![vec![false; 9]; 9]) {
                    self.remove_group(nx as usize, ny as usize, opponent);
                    captured = true;
                }
            }
        }

        // Check if the placed stone's group has liberties
        if !self.has_liberties(x, y, self.current_player, &mut vec![vec![false; 9]; 9]) {
            self.board[y][x] = 0; // Revert the move
            return false;
        }

        // Switch player
        self.current_player = if self.current_player == 1 { 2 } else { 1 };
        true
    }

    pub fn pass_turn(&mut self) {
        self.current_player = if self.current_player == 1 { 2 } else { 1 };
    }

    pub fn get_board_state(&self, x: usize, y: usize) -> u8 {
        self.board[y][x]
    }

    pub fn current_player(&self) -> u8 {
        self.current_player
    }

    fn has_liberties(&self, x: usize, y: usize, player: u8, visited: &mut Vec<Vec<bool>>) -> bool {
        if x >= 9 || y >= 9 || visited[y][x] || self.board[y][x] != player {
            return false;
        }

        visited[y][x] = true;

        // Check for empty adjacent points (liberties)
        let directions = [(-1, 0), (1, 0), (0, -1), (0, 1)];
        for &(dx, dy) in directions.iter() {
            let nx = x as i32 + dx;
            let ny = y as i32 + dy;
            if nx >= 0 && nx < 9 && ny >= 0 && ny < 9 {
                if self.board[ny as usize][nx as usize] == 0 {
                    return true;
                }
                if self.board[ny as usize][nx as usize] == player && !visited[ny as usize][nx as usize] {
                    if self.has_liberties(nx as usize, ny as usize, player, visited) {
                        return true;
                    }
                }
            }
        }
        false
    }

    fn remove_group(&mut self, x: usize, y: usize, player: u8) {
        if x >= 9 || y >= 9 || self.board[y][x] != player {
            return;
        }

        self.board[y][x] = 0;
        let directions = [(-1, 0), (1, 0), (0, -1), (0, 1)];
        for &(dx, dy) in directions.iter() {
            let nx = x as i32 + dx;
            let ny = y as i32 + dy;
            if nx >= 0 && nx < 9 && ny >= 0 && ny < 9 {
                self.remove_group(nx as usize, ny as usize, player);
            }
        }
    }
}