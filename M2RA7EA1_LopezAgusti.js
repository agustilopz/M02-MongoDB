/* --------------------------------- EXERCICI 1 --------------------------------  */

//mongoimport --db itb --collection people --type json --file C:\agusti\people_array.json --jsonArray

//mongoimport --db itb --type csv --headerline --file C:\agusti\students.csv

//mongoimport --db itb --collection products --drop --file C:\agusti\products.json


/* --------------------------------- EXERCICI 2 --------------------------------  */

// Ejercicio 1

use catalogo;

db.createCollection('productos');

db.productos.insertMany([{"name": "MacBook Pro"},
                        {"name": "MacBook Air"},
                        {"name": "MacBook"}])

show dbs;

exit;

mongo;

use catalogo;

// Ejercicio 2


