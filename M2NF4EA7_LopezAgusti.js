use itb;

/* -------------------------- EXERCICI 1. INSERCIONS -------------------------- */
/* Inserta els dos registres que trobaras al fitxer dadesInserts.json dins la col·lecció "people".
Si hi ha algun registre que no pots insertar degut a la sintàxis, corregeix el que sigui necessari
per insertar el registre. */

db.people.insertOne({
	"isActive" : false,
	"balance" : "$7,640.00",
	"picture" : "http://placehold.cat/32x32",
	"age" : 46,
	"name" : "Manuel Pares",
	"company" : "Tutor",
	"phone":  "843-729-40809",
	"email" : "mpares@tutor.com",
	"address" : "33785, Rome,Rescue aveniu",
	"about" : "Ad nostrud aliquip elit labore. Tempor consequat laboris incididunt consequat. Minim ex magna mollit laborum occaecat aliqua enim veniam. In culpa eiusmod irure do et et laborum non exercitation consequat sit voluptate exercitation id.\r\n",
	"registered" : "2000-02-12T01:35:45 -01:00",
	"latitude" : -12,
	"tags" : [
		"do",
		"qui",
		"adipisicing",
		"siusmod",
		"dolore",
		"magna",
		"reprehenderit",
	],
	"friends" : [
		{
			"id" : 1,
			"name":  "Alyssa Oldman"
		},
		{
			"id" : 2,
			"name" : "Serenity Oswald"
		},
		{
			"id" : 3,
			"name" : "Sofia Webster"
		}
	],
	"gender" : "male",
	"randomArrayItem" : "teacher",
})

db.people.insertOne({

	"isActive" : false,
	"balance" : "$6,540.00",
	"picture" : "http://placehold.it/32x32",
	"age" : 39,
	"name" : "Aly Sheldon",
	"company" : "Cobbs",
	"phone":  "655-733-32802",
	"email" : "asheldon@cobbs.com",
	"address" : "32687, Cincinnati,,Alisson street",
	"about": "Ad nostrud aliquip elit labore. Tempor consequat laboris incididunt consequat. Minim ex magna mollit laborum occaecat aliqua enim veniam. In culpa eiusmod irure do et et laborum non exercitation consequat sit voluptate exercitation id.\r\n",
	"registered" : "1994-05-29T03:14:10 -02:00",
	"latitude" : -9,
	"tags" : [
		"do",
		"qui",
		"incididunt",
		"siusmod",
		"dolore",
		"qui",
		"reprehenderit"
	],
	"friends" : [
		{
			"id" : 1,
			"name" : "Mariah Campbell"
		},
		{
			"id":  2,
			"name" : "Serenity Oswald"
		},
		{
			"id" : 3,
			"name" : "Layla WifKinson"
		}
	],
	"gender" : "female",
	"randomArrayItem" : "student"
})

db.people.find().count()



/* --------------------------  EXERCICI 2. CONSULTES ---------------------------- */
/* a) Mostra les persones que el camp "name" acabi amb la lletra "n" però mostra només el
camp "email". */
db.people.find(
{name: /n$/i},
{email: 1, _id: 0}
)

/* b) Mostra les persones que tinguin dins el camp "tags" o la paraula "qui" o la paraula
"sunt". Limita que es mostrin només 8 documents, i que es vegin en un format "bonic". */
db.people.find(
{tags: {$in: ["qui", "sunt"]}}
).limit(8).pretty()

/* c) Mostra les persones que tenen com a amiga a "Serenity Nelson". Mostra els resultats en
un format "bonic". */
db.people.find(
{"friends.name": "Serenity Nelson"}
).pretty()

/* d) Quantes persones s’han registrat entre l'any 2001 i 2018 (inclosos) i que en el camp
"company" aparegui l’expressió regular "jam"? Has de mostrar el número de persones. */
db.people.find(
{registered: {$gte: '2001-01-01', $lte: '2018-01-01'}, company: /jam/i}
).count()

/* e) Mostra les persones que no tinguin com tags ni "tempor" ni "nulla". Mostra només el
camp "tags". */
db.people.find(
{tags: {$nin: ["tempor", "nulla"]}},
{tags: 1, _id: 0}
)

/* f) Mostra totes les persones de sexe femeni que tinguin 3 amics i que no estiguin actives.
Mostra els resultats en un format "bonic". */
db.people.find({
gender: "female", friends: {$size: 3}, isActive: false
}).pretty()

/* ----------------------------- EXERCICI 3. ACTUALITZACIONS ----------------------------*/
/* a) Afegeix un nou camp anomenat "longitude" a totes les persones que en la seva adreça
contingui la paraula "Berkeley". El valor d'aquest nou camp serà de 1. Has de tenir en
compte el case sensitive. */
db.people.updateMany(
{ address: /Berkeley/i },
{$set: { longitude: 1} }
)

db.people.find(
{ address: /Berkeley/i }
)
/* b) Afegeix un altre tag anomenat "foot", a la persona anomenada "Bella Carrington". */
db.people.updateOne(
{name: "Bella Carrington"},
{$addToSet: {tags: "foot"} }
)

// db.people.find({name: "Bella Carrington"})

/* c) Afegeix un altre subdocument (amic) al camp «friends» de la persona anomenada "Julia
Young". El nou subdocument té al camp "id" el valor "1" i al camp "name" el valor
"Trinity Ford". */
db.people.updateOne(
{name: "Julia Young"},
{}
)


/* d) Modifica el segon tag de la persona anomenada "Ava Miers"", el segon tag s'ha de dir
"sunt". */
db.people.updateOne(
{name: "Ava Miers"},
{$set: {"tags.1" : "sunt"}}
)

/* ------------------------------ EXERCICI 4. ELIMINACIONS ------------------------------ */
/* a) Elimina totes les persones que el nom continguin l’expressió regular "berl" . Has de
tenir en compte el case sensitive. */
db.people.deleteMany({
name: /berl/i
})

db.people.find({name: /berl/i})

/* b) Elimina el camp «latitude» de tots els documents de la col·lecció. */
db.people.updateMany(
{},
{$unset: {latitude: ""}}
)

/* c) Elimina el tag "enim" del camp "tags" de la persona anomenda "Aubrey Calhoun". */
db.people.updateOne(
{name: "Aubrey Calhoun"},
{$pull: { tags: "enim" }}
)

//db.people.find({name: "Aubrey Calhoun"})

/* d) Elimina l'últim element del camp tags de la persona anomenada "Caroline Webster". */
db.people.updateOne(
{name: "Caroline Webster"},
{$pop: { tags: 1 }}
)

//db.people.find({name: "Caroline Webster"})

/* ------------------------------- EXERCICI 5. AGREGACIONS ------------------------------- */
/* a) Mostra una llista amb el nom de tots els amics de les persones. Utilitza l’estructura
aggregate. */
db.people.aggregate([
  { $unwind: "$friends" },              // Separa cada amic en un document individual
  {
    $project: {
      _id: 0,
      nom: "$friends.name"              // Mostra només el nom de l'amic
    }
  }
])

// Solució:
db.people.aggregate([{$unwind: "$friends"}, {$group: {_id:
{NomAmic:"$friends.name"}}}]);


/* b) Cada persona té un array d’etiquetes (tags). Mostra quantes vegades apareix cada
etiqueta. Utilitza l'estructura aggregate. */
db.people.aggregate([
{ $unwind: "$tags" },
  {
    $group: {
      _id: "$tags",                   // 2. Agrupa per cada tag individual
      vegades: { $sum: 1 }            // 3. Compta quantes vegades apareix
    }
  }
])

// Solució:
db.getCollection('people').aggregate([{$unwind:"$tags"},{$group:
{_id:"$tags",num_etiquetes:{$sum:1} } }]);

/* c) Calcula la mitjana d’edat del homes i la mitjana d’edat de les dones. Utilitza l’estructura
aggregate, i utilitza les funcions $group i $avg. Mostra el gènere (camp "gender") i la
mitjana d’edat del gènere (camp "age"). */
db.people.aggregate([
  {
    $group: {
      _id: "$gender",              // Agrupa per gènere: "male", "female", etc.
      mitjanaEdat: { $avg: "$age" } // Calcula la mitjana d'edat per grup
    }
  },
  {
    $project: {
      _id: 0,
      gender: "$_id",
      age: { $round: ["$mitjanaEdat", 2] } // Mostra edat amb 2 decimals (opcional)
    }
  }
])

// Solució:
db.people.aggregate({
$group: {
_id: {
gènere: "$gender"
},
mitjanaEdat: {
$avg: "$age"
}
}
});

/* d) Mostra totes les persones que tinguin 7 o més etiquetes (tags). Utilitza l’estructura
aggregate. Utilitza les funcions $project i $match, i mostra només el nom de la persona i
número d’etiquetes. */
db.people.aggregate([
  {
    $project: {
      _id: 0,
      name: 1,                           // Mostra el nom de la persona
      numTags: { $size: "$tags" }       // Calcula el nombre d’etiquetes
    }
  },
  {
    $match: {
      numTags: { $gte: 7 }              // Filtra les persones amb 7 o més
    }
  }
])

// Solució:
db.getCollection('people').aggregate([{ "$project": {nom:"$name",
_id:0,"numero_etiquetes": { "$size":"$tags" }}}, {$match: {"numero_etiquetes":
{$gte:7}}}]);

 // O també:

db.getCollection('people').aggregate([{ "$project": {name:1, _id:0,"mida": { "$size":
"$tags" }}}, {$match: {"mida":{$gte:7}}}]);


