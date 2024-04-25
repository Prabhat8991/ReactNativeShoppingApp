import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabase('products.db')

export function init() {
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`CREATE TABLE IF NOT EXISTS products (
        id INTEGER NOT NULL,
        title TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image TEXT NOT NULL,
        rate REAL NOT NULL,
        isFav BOOLEAN NOT NULL DEFAULT 0,
        isAddedToCart BOOLEAN NOT NULL DEFAULT 0
      )`, [], () => { resolve() }, (_, error) => { reject(error) })
        })
    })
    return promise
}


export function insertOrUpdateProduct(product) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM products WHERE id = ?`,
                [product.id],
                (_, result) => {
                    if (result.rows.length > 0) {
                        // Product already exists, perform update
                        txn.executeSql(
                            `UPDATE products SET title = ?, price = ?, description = ?, image = ?, rate = ?, isFav = ?, isAddedToCart = ? WHERE id = ?`,
                            [
                                product.title,
                                product.price,
                                product.description,
                                product.image,
                                product.rating.rate,
                                product.isFav,
                                product.isAddedToCart,
                                product.id
                            ],
                            (_, updateResult) => {
                                console.log('Product updated:', updateResult);
                                resolve(updateResult);
                            },
                            (_, updateError) => {
                                console.error('Error updating product:', updateError);
                                reject(updateError);
                            }
                        );
                    } else {
                        // Product doesn't exist, perform insert
                        txn.executeSql(
                            `INSERT INTO products (id, title, price, description, image, rate, isFav, isAddedToCart) VALUES (?,?,?,?,?,?,?,?)`,
                            [
                                product.id,
                                product.title,
                                product.price,
                                product.description,
                                product.image,
                                product.rating.rate,
                                product.isFav,
                                product.isAddedToCart
                            ],
                            (_, insertResult) => {
                                console.log('Product inserted:', insertResult);
                                resolve(insertResult);
                            },
                            (_, insertError) => {
                                console.error('Error inserting product:', insertError);
                                reject(insertError);
                            }
                        );
                    }
                },
                (_, error) => {
                    console.error('Error checking existing product:', error);
                    reject(error);
                }
            );
        });
    });

    return promise;
}

export function updateProductIsFav(productId, isFav) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(txn => {
            txn.executeSql(
                `UPDATE products SET isFav = ? WHERE id = ?`,
                [isFav, productId],
                (_, result) => {
                    console.log(result);
                    resolve(); // Resolve the promise once the update is successful
                },
                (_, error) => {
                    console.log(error);
                    reject(error); // Reject the promise if there's an error
                }
            );
        });
    });

    return promise;
}

export function updateProductIsAddedToCart(productId, isAddedToCart) {
    const promise = new Promise((resolve, reject) => {
        database.transaction(txn => {
            txn.executeSql(
                `UPDATE products SET isAddedToCart = ? WHERE id = ?`,
                [isAddedToCart, productId],
                (_, result) => {
                    console.log(result);
                    resolve(); // Resolve the promise once the update is successful
                },
                (_, error) => {
                    console.log(error);
                    reject(error); // Reject the promise if there's an error
                }
            );
        });
    });

    return promise;
}

//get

export function getAllProducts() {
    const promise = new Promise((resolve, reject) => {
        database.transaction(txn => {
            txn.executeSql(
                `SELECT * FROM products`,
                [],
                (_, result) => {
                    const products = [];
                    for (let i = 0; i < result.rows.length; i++) {
                        const product = result.rows.item(i);
                        products.push(product);
                    }
                    resolve(products);
                },
                (_, error) => {
                    console.error('Error fetching products:', error);
                    reject(error);
                }
            );
        });
    });

    return promise;
}