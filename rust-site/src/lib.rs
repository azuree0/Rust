use wasm_bindgen::prelude::*;
mod game;

#[wasm_bindgen]
#[derive(Clone)]
pub struct CartItem {
    id: u32,
    name: String,
    price: f64,
    quantity: u32,
}

#[wasm_bindgen]
impl CartItem {
    pub fn new(id: u32, name: String, price: f64, quantity: u32) -> CartItem {
        CartItem { id, name, price, quantity }
    }

    pub fn get_id(&self) -> u32 { self.id }
    pub fn get_name(&self) -> String { self.name.clone() }
    pub fn get_price(&self) -> f64 { self.price }
    pub fn get_quantity(&self) -> u32 { self.quantity }
}

#[wasm_bindgen]
pub struct ShoppingCart {
    items: Vec<CartItem>,
}

#[wasm_bindgen]
impl ShoppingCart {
    #[wasm_bindgen(constructor)]
    pub fn new() -> ShoppingCart {
        ShoppingCart { items: vec![] }
    }

    pub fn add_item(&mut self, id: u32, name: String, price: f64, quantity: u32) {
        self.items.push(CartItem::new(id, name, price, quantity));
    }

    pub fn get_total(&self) -> f64 {
        self.items.iter().map(|item| item.price * item.quantity as f64).sum()
    }

    pub fn get_items(&self) -> Vec<CartItem> {
        self.items.clone()
    }
}