/* ---------------------------------- EXAMEN NF4 ----------------------------------- */

/* --------------------------- EXERCICI 1 ----------------------------*/
use itb;

db.restaurants.insertOne(
{
    "title" : "FAITH (VOL. 4): LOS ANTIFAITH",
    "isbn" : "9788417615871",
    "pageCount":  112,
    "publishedDate" : ISODate("2019-05-14T08:00:00.000Z")
    "thumbnailUrl" : "https://www.casadellibro.com/libro-faith-vol-4-los-antifaith/9788417615871/9611541",
    "shortDescription" : "Faith, la heroína voladora que protege Los Ángeles, es como un sueño para los habitantes de la ciudad... ¡Y ahora están a punto de conocer a su peor pesadilla! Cuando una psiot fugitiva empieza a arrasar las calles, Faith se ve obligada a detener la locura que se ha desatado antes de que todo se vaya al infierno. Pero esta no es una amenaza normal... No solo tiene el poder de absorber la energía de todo lo que la rodea, ¡sino que es una de las estrellas pop más controvertidas de Los Ángeles!.",
    "status" : "PUBLISH",
    "authors" : [
        "Jody Houser"
    ],
    "categories" : [
        "Cómic Adulto"
    ,
"edition": {
"number": "first",
"type": "basic"
}
"reviews": [{"date": {"$date": 1419897600000}, "review": "A", "score": 8}, {"date": {"$date": 1404172800000}, "review": "B", "score" 23}, {"date": {"$date": 1367280000000}, "review": "A", "score": 12} {"date": {"$date": 1336435200000}, "review": "A, "score": 12}]

}



)



/* --------------------------- EXERCICI 2 ----------------------------*/
db.restaurants.find()
// a)
db.restaurants.find(
{"address.zipcode": "10021", cuisine: "French"}).sort({restaurant_id: 1});

// b
db.restaurants.find(
{ name: /o$/i },
{_id: 0, cuisine: 1, "address.street": 1}).limit(10)

//c
db.products.find({price: {$gte: 500, $lte: 1000}}).sort({name: -1}).pretty()

//d
db.products.find(
{categories: {$in: ["watch", "tv"]}}
)


//e
db.restaurants.find({
  $and: [
    {cuisine: /w/i},
    {cuisine: /f/i},
  ]
})


//f
db.books.find(
{"categories.1": "Internet"}
)

//g
db.books.find(
{title:  {$not: /^[AEIOU]/i}},
{title: 1, _id: 0}
)

// h ------------
db.restaurants.find({
"grades.2.grade": "A", "grades.score": 12
})
















/* --------------------------- EXERCICI 3 ----------------------------*/
//a
db.products.updateOne(
{name: "iPhone 8"},
{$addToSet: {categories : "Extraphone"}}
)

// b
db.restaurants.updateMany(
{ cuisine: "Caribbean", borough: "Manhattan"},
{$set: { Likes: 300} }
)

//c
db.restaurant.updateMany(
{restaurant_id: "40368271"},
{$set: {"address.cord": {$or: ["-88.886970", "6972532"]}}}
)

db.restaurants.find({restaurant_id: "40368271"})

// d    -----------------------------
db.books.updateOne(
{title: "HTML5 in Action"},
{$set: {"authors.Joe Lennon": "Rob Pen"} }
)

/* --------------------------- EXERCICI 4 ----------------------------*/

// a
db.products.updateOne(
{name: "iPad Pro"},
{$pop: {categories: -1}}
)

// b
db.products.deleteMany({stock: {$lt: 30}})

// c
db.people.updateMany(
{borough: "Queens"},
{$unset: {building: ""} }
)

// d
db.books.updateOne(
{isbn: "1884777902"},
{$pull: {categories: "Java"}}
)


/* --------------------------- EXERCICI 5 ----------------------------*/

//a


db.books.aggregate([
{
$unwind: "$categories"
},
{
$project: {
numCategories: {$size: "$categories"},
name: 1
}
},
{
$sort: {numCategories: 1 }
}
])

db.books.aggregate([
{
$unwind: "$categories"
},
{
$project: {
numCategories: {$size: "$categories"},
name: 1
}
},
{
$sort: {numCategories: 1 }
}
])



// b
db.restaurants.aggregate([
{$group: {
_id: "$cuisine",
total: {$sum: 1} }
}
])

// c
db.products.aggregate([
{$unwind:"$categories"},
{$group:{_id:"$categories",num:{$sum:1}}},
]);


// d
db.products.aggregate([
{$group: {
_id: "$price",
mitjana: {$avg: "$price"} }
}
])

// e
db.restaurants.aggregate([
{$project: {street: "$address.street", coord: "$address.coord", _id: 0}}
])





