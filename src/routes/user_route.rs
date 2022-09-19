use crate::models::user_model::print_user_model;

//
// 絶対パス、相対パスの例
//

// pub fn print_user_route() {
//     // 完全なパス
//     crate::routes::health_route::print_health_route();
//     // 親モジュールからのパス
//     super::health_route::print_health_route();
//     println!("user_route");
// }

//
// useを使って短縮
//
pub fn print_user_route() {
    print_user_model();
    println!("user_route");
}
