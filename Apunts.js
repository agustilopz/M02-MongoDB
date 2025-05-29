// Igualtat exacta
db.collection.find({camp: "valor"})

// Comparacions numèriques
db.collection.find({edat: {$gt: 18}})
db.collection.find({edat: {$gte: 18}})
db.collection.find({edat: {$lt: 65}})
db.collection.find({edat: {$lte: 65}})
db.collection.find({edat: {$ne: 25}})

// Rangs
db.collection.find({any: {$gte: 1990, $lte: 1999}})

// Valor dins d'una llista
db.collection.find({any: {$in: [1990, 1995, 2000]}})

// Valor NO dins d'una llista
db.collection.find({any: {$nin: [1990, 1995, 2000]}})

// Mòdul
db.collection.find({any: {$mod: [2, 0]}})
db.collection.find({any: {$mod: [10, 0]}})

// Expressions regulars
db.collection.find({email: /\.net$/})
db.collection.find({nom: /^[AEIOU]/i})
db.collection.find({nom: /.{14,}/})
db.collection.find({dni: /^[a-zA-Z]/})

// Operadors lògics
db.collection.find({genere: "H", any: 1993})
db.collection.find({
  $or: [
    {any: {$lt: 2000}},
    {any: {$gt: 2010}}
  ]
})

// Camps buits o inexistents
db.collection.find({cognom2: ""})
db.collection.find({
  $or: [
    {cognom2: {$exists: false}},
    {cognom2: ""},
    {cognom2: null}
  ]
})

// Inserir documents
db.collection.insertOne({
  camp1: "valor1",
  camp2: "valor2",
  array: ["element1", "element2"]
})
db.collection.insertMany([
  {camp1: "valor1"},
  {camp1: "valor2"}
])

// Actualitzar documents
db.collection.updateOne(
  {criteri: "valor"},
  {$set: {nou_camp: "nou_valor"}}
)
db.collection.updateOne(
  {criteri: "valor"},
  {$unset: {camp_a_eliminar: ""}}
)
db.collection.updateMany(
  {criteri: "valor"},
  {$set: {camp: "nou_valor"}}
)

// Afegir a arrays
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$addToSet: {array_camp: "nou_element"}}
)
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$push: {array_camp: "nou_element"}}
)

// Eliminar d'arrays
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$pop: {array_camp: -1}}
)
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$pop: {array_camp: 1}}
)
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$pull: {array_camp: "element_a_eliminar"}}
)

// Modificar arrays
db.collection.updateOne(
  {criteri: "valor"},
  {$set: {"array_camp.1": "nou_valor"}}
)
db.collection.updateOne(
  {criteri: "valor"},
  {$set: {"subdocuments.0.camp": "nou_valor"}}
)

// Consultes amb arrays
db.collection.find({array_camp: "element"})
db.collection.find({"subdocuments.camp": "valor"})
db.collection.find({array_camp: {$size: 3}})
db.collection.find({array_camp: {$all: ["element1", "element2"]}})
db.collection.find({"array_camp.1": "valor"})

// Eliminació
db.collection.deleteOne({criteri: "valor"})
db.collection.deleteMany({criteri: "valor"})

// Agregacions
db.collection.aggregate([
  {$match: {criteri: "valor"}},
  {$project: {camp: 1, _id: 0}},
  {$group: {...}},
  {$sort: {camp: 1}},
  {$limit: 10}
])
db.collection.aggregate([
  {$unwind: "$array_camp"}
])
db.collection.aggregate([
  {$group: {
    _id: "$camp_grup",
    total: {$sum: 1}
  }}
])
db.collection.aggregate([
  {$group: {
    _id: "$genere",
    mitjana_edat: {$avg: "$edat"}
  }}
])
db.collection.aggregate([
  {$group: {
    _id: "$categoria",
    elements: {$addToSet: "$element"}
  }}
])
db.collection.aggregate([
  {$project: {
    _id: 0,
    nom: 1,
    num_elements: {$size: "$array"}
  }}
])
db.collection.aggregate([
  {$match: {
    edat: {$gte: 18},
    actiu: true
  }}
])

// Exemples complets
db.people.aggregate([
  {$unwind: "$tags"},
  {$group: {
    _id: "$tags",
    vegades: {$sum: 1}
  }}
])
db.people.aggregate([
  {$group: {
    _id: "$gender",
    mitjana_edat: {$avg: "$age"}
  }},
  {$project: {
    _id: 0,
    genere: "$_id",
    edat: {$round: ["$mitjana_edat", 2]}
  }}
])
db.people.aggregate([
  {$project: {
    _id: 0,
    nom: 1,
    num_tags: {$size: "$tags"}
  }},
  {$match: {
    num_tags: {$gte: 7}
  }}
])

// Utilitats
db.collection.find().pretty()
db.collection.find({criteri: "valor"}).count()
db.collection.countDocuments({criteri: "valor"})
db.collection.find().limit(5)
db.collection.find().sort({camp: 1})
db.collection.find().sort({camp: -1})
db.collection.find(
  {criteri: "valor"},
  {camp1: 1, camp2: 1, _id: 0}
)
