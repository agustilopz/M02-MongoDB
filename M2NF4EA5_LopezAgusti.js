/* a. Afegeix un camp anomenat “synopsis” al film "The Hobbit: An Unexpected Journey" amb aquest valor :
"A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to
reclaim their mountain home - and the gold within it - from the dragon Smaug." */
db.movieDetails.updateOne(
{title: "The Hobbit: An Unexpected Journey"},
{$set : {synopsis : "A reluctant hobbit, Bilbo Baggins, sets out to the Lonely Mountain with a spirited group of dwarves to reclaim their mountain home - and the gold within it - from the dragon Smaug."}}
)

// Consulta document
db.movieDetails.find({
title: "The Hobbit: An Unexpected Journey"
},
{_id: 0, plot: 1, synopsis: 1}
)

/* b. Afegeix un actor anomenat "Samuel L. Jackson" al film "Pulp Fiction". */
db.movieDetails.updateOne(
{title: "Pulp Fiction"},
{$addToSet: {actors: "Samuel L. Jackson"} }
)

// Consulta document
db.movieDetails.find(
{title: "Pulp Fiction"},
{_id: 0, actors: 1}
)

/* c. Elimina el camp type de tots els documents de la col·lecció “movieDetails”. */
db.movieDetails.updateMany(
{},
{ $unset: {type: ""} }
)

// Consulta document
db.movieDetails.find(
{},
{type: 1}
)


/* d. Modifica el cinquè guionista (writer) de la pel·lícula amb títol (title) : "The World Is Not Enough",
el cinquè gionista s'ha de dir "Bruce Harris". */
db.movieDetails.updateOne(
{title: "The World Is Not Enough"},
{$set: {"writers.4": "Bruce Harris"}}
)

// Consulta document
db.movieDetails.find({
title: "The World Is Not Enough"
},
{_id: 0, title: 1, writers: 1, writer: 1}
)


/* e. Elimina l'últim element del camp genres de la pel·lícula amb títol "Whisper of the Heart". */
db.movieDetails.updateOne(
{ title: "Whisper of the Heart" },
{$pop: {genres: 1} }
)

// Consulta document
db.movieDetails.find({
title: "Whisper of the Heart"
},
{_id: 0, title: 1, genres: 1}
)