/* --------------------------------- EXERCICI 1 --------------------------------  */

//mongoimport --db itb --collection people --type json --file C:\agusti\people_array.json --jsonArray

//mongoimport --db itb --type csv --headerline --file C:\agusti\students.csv

//mongoimport --db itb --collection products --drop --file C:\agusti\products.json


/* --------------------------------- EXERCICI 2 --------------------------------  */

/* ------------ Ejercicio 1 -------------- */
// Crear una base de datos con el nombre catalogo
use catalogo;

// Crear la colección productos
db.createCollection('productos');

// Crear los siguientes documentos de a uno
db.productos.insertMany([{"name": "MacBook Pro"},
                        {"name": "MacBook Air"},
                        {"name": "MacBook"}])
// Listar las bases de datos disponibles
show dbs;

// Listar las colecciones disponibles para la base de datos catalogo
show collections;

// Desconectar el cliente de MongoDB
exit;

// Volver a levantar el cliente de MongoDB pero en esta oportunidad queremos que se conecte directamente a la base de catalogo sin pasar por la base de test
mongo;

use catalogo;

/* ------------ Ejercicio 2 -------------- */
// Buscar todos los documentos de la colección productos
db.productos.find()

// Buscar el documento que tiene la propiedad name con el valor MacBook Air
db.productos.find({"name":"MacBook Air"})

/* ------------ Ejercicio 3 -------------- */
// Buscar todos los documentos de la colección productos utilizando un cursor
// Iterar sobre los documento utilizando hasNext y next para cada documento
let cursor = db.products.find();

while (cursor.hasNext()) {
  printjson(cursor.next());
}

/* ------------ Ejercicio 4 -------------- */

use catalogo;

// Insertar los siguientes documentos en la colección productos utilizando un sólo comando de MongoDB
db.productos.insertMany([{"name": "iPhone 8"},
                        {"name": "iPhone 6s"},
                        {"name": "iPhone X"},
                        {"name": "iPhone SE"},
                        {"name": "iPhone 7"}]);

// Listar todos los documentos de la colección productos
db.productos.find()

// Buscar el docuemnto que tiene la propiedad name con el valor iPhone 7
db.productos.find({"name":"iPhone 7"})

// Buscar el docuemnto que tiene la propiedad name con el valor MacBook
db.productos.find({"name":"MacBook"})

/*    -------------- Ejercicio 5 -------------- */
// Borrar la colección productos
db.productos.drop()

// Borrar la base de datos catalogo
db.dropDatabase()

// Crear la base de datos catalogo y colección productos de nuevo
use catalogo

db.productos.insertMany([{"name": "iPhone 8"},
{"name": "MacBook Pro"},
{"name": "iPhone 6s"},
{"name": "MacBook Air"},
{"name": "iPhone X"},
{"name": "iPhone SE"},
{"name": "MacBook"},
{"name": "iPhone 7"}])

// Buscar el producto que tiene la propiedad name con el valor iPhone X
db.productos.find({"name":"iPhone X"})

/*    -------------- Ejercicio 6 ------------  */
// Importar el archivos de documentos products.json en la base de datos catalogo y utilizar la colección productos
 /* mongoimport --db catalogo --collection productos --drop --file C:\agusti\products.json */

// Buscar todos los documentos importados
db.productos.find()

// Buscar propiedades
db.products.find({"price":329})
db.products.find({"stock":100})
db.products.find({"name":"Apple Watch Nike+"})

/*    -------------- Ejercicio 7 ------------  */
// Buscar los productos que tienen la propiedad name con el valor 1 y la propiedad price con el valor 1
db.products.find({name: 1, price: 1})

// Buscar los productos que tienen las categorías macbook y notebook
db.products.find({categories: ["macbook", "notebook"]})

// Buscar los productos que tienen la categoría watch
db.products.find({categories: "watch"})

/*    -------------- Ejercicio 8 ------------  */
// Buscar los productos que tienen la propiedad price con el valor 2399 y mostrar sólo la propiedad name en el resultado
db.products.find(
  { price: 2399 },   // filtre
  { name: 1, _id: 0 }     // projecció
)

// Buscar los productos que tienen la propiedad categories con el valor iphone y ocultar las propiedad stock y picture del resultado
db.products.find(
  { categories: "iphone" },   // filtre
  { stock: 0, picture: 0 }     // projecció
)

// Repetir todas las búsquedas anteriores y ocultar la propiedad _id en todas ellas
db.products.find(
  { categories: "iphone" },   // filtre
  { stock: 0, picture: 0 , _id: 0}     // projecció
)

/*    -------------- Ejercicio 9 ------------  */
// Buscar los productos que tienen la propiedad price mayor a 2000
db.products.find({price: {$gt : 2000}})

// Buscar los productos que tienen la propiedad price menor a 500
db.products.find({price: {$lt : 2000}})

// Buscar los productos que tienen la propiedad price menor o igual que 500
db.products.find({price: {$lte : 500}})

// Buscar los productos que tienen la propiedad price en el rango de 500 a 1000
db.products.find({price: {$gte : 500, $lte : 1000}})

// Buscar los productos que tienen la propiedad price con alguno de los siguientes valores 399 o 699 o 1299 (hacer en un solo query)
db.products.find({
  price: { $in: [399, 699, 1299] }
})

/*    -------------- Ejercicio 10 ------------  */
// Buscar los productos que tienen la propiedad stock con el valor 200 Y tienen la categoría iphone
//(utlizar el operador and)
db.products.find({
  $and: [
    { stock: 200 },
    { categories: "iphone" }
  ]
})

// Buscar los productos que tienen la propiedad price con el valor 329 O tienen la categoría tv
//(utlizar el operador or)
db.products.find({
  $or: [
    { price: 329 },
    { categories: "tv" }
  ]
})

/*    -------------- Ejercicio 11  ------------  */
// Actualizar el producto que tiene la propiedad name
//con el valor Mac mini y establecer la propiedad stock con el valor 50
db.products.updateOne(
  { name: "Mac mini" },      // Filtre: busca el document amb name "Mac mini"
  { $set: { stock: 50 } }   // Actualitza la propietat stock a 50
)

// Actualizar el producto que tiene la propiead name con el valor iPhone X
// y agregarle la propiedad prime con el valor true
db.products.updateOne(
  { name: "iPhone X" },          // Filtre pel producte amb name "iPhone X"
  { $set: { prime: true } }      // Afegeix o actualitza la propietat prime = true
)

// Buscar los documentos actualizados y listarlos mostrando los datos de forma más linda
// y ocultando las propiedades stock, categories y _id
db.products.find(
{
$or: [
{name: "Mac mini"},
{prime: true}
]
},
{stock: 0, categories: 0, _id : 0}
)


/*    -------------- Ejercicio 12  ------------  */
// Actualizar el producto con la propiedad name y el valor iPad Pro
// agregadole una categoría nueva llamada prime
db.products.updateOne(
  { name: "iPad Pro" },
  { $addToSet: { categories: "prime" } }
)

// Actualizar el producto con la propiedad name y el valor iPad Pro sacar la categoría agregada
//(último elemento de la propiedad categories)
db.products.updateOne(
  { name: "iPad Pro" },
  { $pop: { categories: 1 } }  // 1 elimina l'últim, -1 el primer
)

// Actualizar el producto con la propiedad name y el valor iPhone SE sacar la primer
//categoría que tiene asignada
db.products.updateOne(
  { name: "iPhone SE" },
  { $pop: { categories: -1 } }  // 1 elimina l'últim, -1 el primer
)

// Actualizat todos los documentos que tienen la propiedad price mayor a 2000
//y agregarle la categoría expensive
db.products.updateMany(
{ price: {$gt: 2000}},
{ $addToSet : {categories: "expensive"} }
)

/*    -------------- Ejercicio 13  ------------  */
// Borrar todos los productos que tienen la categoía tv
db.products.deleteMany(
{categories : "tv"}
)

--o
db.products.deleteMany({
  categories: { $in: ["tv"] }
})

// Borrar el producto que tiene la propiedad name con el valor Apple Watch Series 1
db.products.deleteOne({
 name: "Apple Watch Series 1"
})

// Obtener la propiedad _id del producto que tiene la propiedad name con el valor Mac mini
db.products.find(
{name: "Mac mini"},
{_id : 1}
)

/*   ------    ERRORS ---------- */
// Utilizar el _id buscado para borrar el producto utilizando ese criterio
db.products.deleteOne({
  _id: "664a9d3ef14c1a5b3c25e9f7"
})
//--
const doc = db.products.findOne({ name: "Mac mini" });
db.products.deleteOne({ _id: doc._id });
--
db.products.deleteOne({ name: "Mac mini" })


/*    -------------- Ejercicio 14  ------------  */
// Importar el archivos de documentos products.json en la base de datos catalogo y utilizar la colección productos
 /* mongoimport --db catalogo --collection productos --drop --file C:\agusti\products.json */

 // Buscar todos los documentos importados
db.productos.find()

/*    -------------- Ejercicio 15  ------------  */
// Buscar todos los productos y ordenarlos por la propiedad price ascendente
db.productos.find().sort({price: 1});

// Buscar todos los productos y ordenarlos por la propiedad price descendente
db.productos.find().sort({price: -1});

// Buscar todos los productos y ordenarlos por la propiedad stock ascendente
db.productos.find().sort({stock: 1});

// Buscar todos los productos y ordenarlos por la propiedad stock descendente
db.productos.find().sort({stock: -1});

// Buscar todos los productos y ordenarlos por la propiedad name ascendente
db.productos.find().sort({name: 1});

// Buscar todos los productos y ordenarlos por la propiedad name descendente
db.productos.find().sort({name: -1});

/*    -------------- Ejercicio 16  ------------  */
// Mostrar sólo la propiedad name de los primeros 2 productos
db.productos.find(
{},                 // sense filtre, tots els productes
{ name: 1, _id: 0}  // projecció: només mostrar 'name', ocultar '_id'

).limit(2);

// Mostrar sólo la propiedad name de los primeros 5 productos ordenados por nombr
db.productos.find(
{},                 // sense filtre, tots els productes
{ name: 1, _id: 0}  // projecció: només mostrar 'name', ocultar '_id'

).sort({name: 1}).limit(5);

/*--------||||---------*/
// Mostrar sólo la propiedad name de los últimos 5 productos ordenados por nombre
db.productos.find(
{},                 // sense filtre, tots els productes
{ name: 1, _id: 0}  // projecció: només mostrar 'name', ocultar '_id'

).sort({name: -1}).limit(5);

/*    -------------- Ejercicio 17  ------------  */
// Mostrar todos los documentos de la colección products utilizando un paginador
// El tamaño de la página tiene que ser de 5 documentos
db.products.find({}).skip(5).limit(5)

// Pàgina 1 (documents 1-5)
db.productos.find().limit(5)

// Pàgina 2 (documents 6-10)
db.productos.find().skip(5).limit(5)

// Pàgina 3 (documents 11-15)
db.productos.find().skip(10).limit(5)

// Pàgina 4 (documents 16-20)
db.productos.find().skip(15).limit(5)





