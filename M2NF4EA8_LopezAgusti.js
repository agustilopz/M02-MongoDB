use itb;
/* 1) De la col·lecció «books» mostra tots els llibres que tinguin com a mínim 5 authors. */
db.books.aggregate([
{ $project: {
_id: 0,
title: 1,
authors: {$size: "$authors"}
}
},
{$match: { authors: {$gte: 5} }}
])

db.books.find()

// Solució:
db.books.aggregate([
{ "$project": {
_id:"$title",
"num_autors": { "$size": "$authors" }}},
{$match: {"num_autors":{$gte:5}}}]);

/* 2) De la col·lecció «books» mostra els llibres ordenats per número d’autors de forma descendent.
Primer els llibres amb més autors i al final els llibres amb menys autors. */
db.books.aggregate([
{
$project: {
title: 1,
authors: 1,
numAuthors: {$size: "$authors"}
}
},
{
$sort: {numAuthors: -1 }
}
])

// Solució:
db.books.aggregate([{ "$project": {_id:"$title","num_autors": { "$size": "$authors" }}}, { "$sort": { "num_autors": -1 } }]);


/* 3) De la col·lecció «books» mostra els ISBN per cada Status "status". Utilitza l’estructura
aggregate, i utilitza les funcions $group i $addToSet. */
db.books.aggregate([
  {
    $group: {
      _id: "$status",               // agrupem per status
      isbns: { $addToSet: "$isbn" } // recollim tots els ISBNs sense duplicats
    }
  },
  {
    $project: {
      _id: 0,            // opcional: amaguem _id
      status: "$_id",    // posem el status en un camp clar
      isbns: 1           // mostrem l’array d’ISBNs
    }
  }
])

// Solució
db.books.aggregate([{$group: { _id: { Status : "$status"}, "ISBN": {$addToSet:
"$isbn"}}}]).pretty();


/* 4) De la col·lecció «restaurants» mostra quantes valoracions "grades" té cada restaurant. */
db.restaurants.aggregate([
{
$project: {
_id: 0,
name: 1,
total_grades: {$size: "$grades"} }
}
])

// Solució:
db.restaurants.aggregate([{ "$project": {_id:"$name",valoracions: { "$size":"$grades" }}}]);

/* 5) De la col·lecció «restaurants» mostra quantes vegades apareix cada valoració "score" del camp
grades. */
db.restaurants.aggregate([
{
$unwind: "$grades"
},
{
$group: {
_id: "$grades.score"
vegades: {$sum: 1}
}
},
{
$project: {
valoracio: "$_id",
_id: 0,
vegades: 1
}
}
])

// Solució:
db.restaurants.aggregate([{$unwind:"$grades"},{$group:{_id:"$grades.score",num:{$sum:1}}}]);


/* 6) De la col·lecció «restaurants» mostra quantes vegades la valoració "score" del camp grades ha
sigut 11. */
db.restaurants.aggregate([
{
$unwind: "$grades"
},
{
$group: {
_id: "$grades.score",
vegades: {$sum: 1}
}

},
{
$match: {
vegades: 11
}
}
])

// Solució:
db.restaurants.aggregate.aggregate([
{$unwind:"$grades"},
{$group:{_id:"$grades.score",num:{$sum:1}}},
{$match: {"_id":"11"}}]);


/* 7) De la col·lecció «restaurants» mostra quantes vegades apareix cada valoració "score" del camp
grades però mostra només les valoracions que apareixen més de 60 vegades. */
db.restaurants.aggregate([
{$unwind:"$grades"},
{$group:{_id:"$grades.score",num:{$sum:1}}},
{$match: {"num":{$gt:60}}}]);

/* 8) De la col·lecció «restaurants» mostra els tipus de cuina "cuisine" de cada barri "borough". */
db.restaurants.aggregate([
{$group: { _id: { Barri : "$borough"}, "Tipus cuina": {$addToSet: "$cuisine"}}}]).pretty();

/* 9) De la col·lecció "restaurants" mostra els noms dels carrers per cada codi postal. */
db.restaurants.aggregate([
{$group: { _id: { CodiPostal : "$address.zipcode"}, "Carrer": {$addToSet: "$address.street"}}}]).pretty();

/* 10) De la col·lecció "restaurants" mostra quants restaurants hi ha en cada codi postal. */
db.restaurants.aggregate([
{$group:{_id:"$address.zipcode",total:{$sum:1}}}]);