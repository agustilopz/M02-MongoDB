/* a. Cerca totes les pel·lícules que a la seva sinopsis conté la paraula “Bilbo”. */
db.movieDetails.find({
synopsis: /Bilbo/i
})

/* b. Compta les pel·lícules que al camp "plot" no contngui la paraula "Bilbo". */
db.movieDetails.find({
plot: { $not : [/Bilbo/i] }
}).count()

//db.movieDetails.find({
//plot: { $ne : [/Bilbo/i] }
//}).count()

/* c. Cerca totes les pel·lícules que a la seva sinopsis conté la paraula "Bilbo" o al camp "plot" conté la paraula "Bilbo". */
db.movieDetails.find({
$or : [
{plot: /Bilbo/i},
{synopsis: /Bilbo/i}
]
})

/* d. Cerca totes les pel·lícules que al camp "plot" conté les paraules "dwarves" o "hobbit". */
db.movieDetails.find({
$or : [
{plot: /dwarves/i},
{plot: /hobbit/i}
]
})

// Alternativa
db.movieDetails.find({
plot: /dwarves|hobbit/i
})

/* e. Cerca totes les pel·lícules que al seu títol conté les paraules "Battle" i "Armies". */
db.movieDetails.find({
$and : [
{title: /Battle/i},
{title: /Armies/i}
]
})

// Alternativa amb una sola expressió regular
db.movieDetails.find({
  title: /(?=.*Battle)(?=.*Armies)/
})