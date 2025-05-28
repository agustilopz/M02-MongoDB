# Apunts MongoDB - Preparació Examen

## 1. Consultes Bàsiques (find)

### Operadors de Comparació
```javascript
// Igualtat exacta
db.collection.find({camp: "valor"})

// Comparacions numèriques
db.collection.find({edat: {$gt: 18}})    // Major que
db.collection.find({edat: {$gte: 18}})   // Major o igual
db.collection.find({edat: {$lt: 65}})    // Menor que
db.collection.find({edat: {$lte: 65}})   // Menor o igual
db.collection.find({edat: {$ne: 25}})    // Diferent de

// Rangs
db.collection.find({any: {$gte: 1990, $lte: 1999}})
```

### Operadors d'Array
```javascript
// Valor dins d'una llista
db.collection.find({any: {$in: [1990, 1995, 2000]}})

// Valor NO dins d'una llista
db.collection.find({any: {$nin: [1990, 1995, 2000]}})
```

### Operadors Matemàtics
```javascript
// Mòdul (anys parells)
db.collection.find({any: {$mod: [2, 0]}})

// Anys múltiples de 10
db.collection.find({any: {$mod: [10, 0]}})
```

### Expressions Regulars
```javascript
// Email que acabi en .net
db.collection.find({email: /\.net$/})

// Nom que comenci per vocal (case insensitive)
db.collection.find({nom: /^[AEIOU]/i})

// Nom amb més de 13 caràcters
db.collection.find({nom: /.{14,}/})

// DNI que comenci per lletra
db.collection.find({dni: /^[a-zA-Z]/})
```

### Operadors Lògics
```javascript
// AND (per defecte)
db.collection.find({genere: "H", any: 1993})

// OR
db.collection.find({
  $or: [
    {any: {$lt: 2000}},
    {any: {$gt: 2010}}
  ]
})
```

### Camps Buits o Inexistents
```javascript
// Camp amb valor buit
db.collection.find({cognom2: ""})

// Camp inexistent, buit o null
db.collection.find({
  $or: [
    {cognom2: {$exists: false}},
    {cognom2: ""},
    {cognom2: null}
  ]
})
```

## 2. Inserció de Documents

### Inserir un document
```javascript
db.collection.insertOne({
  camp1: "valor1",
  camp2: "valor2",
  array: ["element1", "element2"]
})
```

### Inserir múltiples documents
```javascript
db.collection.insertMany([
  {camp1: "valor1"},
  {camp1: "valor2"}
])
```

## 3. Actualització de Documents

### Actualitzar un document
```javascript
// Afegir o modificar camp
db.collection.updateOne(
  {criteri: "valor"},
  {$set: {nou_camp: "nou_valor"}}
)

// Eliminar camp
db.collection.updateOne(
  {criteri: "valor"},
  {$unset: {camp_a_eliminar: ""}}
)
```

### Actualitzar múltiples documents
```javascript
db.collection.updateMany(
  {criteri: "valor"},
  {$set: {camp: "nou_valor"}}
)
```

## 4. **Operacions amb Arrays** ⭐

### Afegir elements a arrays
```javascript
// Afegir element (evita duplicats)
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$addToSet: {array_camp: "nou_element"}}
)

// Afegir element (permet duplicats)
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$push: {array_camp: "nou_element"}}
)
```

### Eliminar elements d'arrays
```javascript
// Eliminar primer element
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$pop: {array_camp: -1}}
)

// Eliminar últim element
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$pop: {array_camp: 1}}
)

// Eliminar element específic
db.collection.updateOne(
  {_id: ObjectId("...")},
  {$pull: {array_camp: "element_a_eliminar"}}
)
```

### Modificar elements específics d'arrays
```javascript
// Modificar element per posició (el segon element = index 1)
db.collection.updateOne(
  {criteri: "valor"},
  {$set: {"array_camp.1": "nou_valor"}}
)

// Modificar element en array de subdocuments
db.collection.updateOne(
  {criteri: "valor"},
  {$set: {"subdocuments.0.camp": "nou_valor"}}
)
```

### Consultes amb arrays
```javascript
// Buscar per element dins array
db.collection.find({array_camp: "element"})

// Buscar per camp dins subdocument d'array
db.collection.find({"subdocuments.camp": "valor"})

// Array amb mida específica
db.collection.find({array_camp: {$size: 3}})

// Array que contingui tots els elements
db.collection.find({array_camp: {$all: ["element1", "element2"]}})

// Segon element d'array específic
db.collection.find({"array_camp.1": "valor"})
```

## 5. Eliminació de Documents

### Eliminar un document
```javascript
db.collection.deleteOne({criteri: "valor"})
```

### Eliminar múltiples documents
```javascript
db.collection.deleteMany({criteri: "valor"})
```

## 6. **Agregacions** ⭐

### Estructura bàsica
```javascript
db.collection.aggregate([
  {$match: {criteri: "valor"}},    // Filtrar documents
  {$project: {camp: 1, _id: 0}},   // Seleccionar camps
  {$group: {...}},                 // Agrupar
  {$sort: {camp: 1}},              // Ordenar
  {$limit: 10}                     // Limitar resultats
])
```

### $unwind - Descomposar arrays
```javascript
// Converteix cada element d'array en un document separat
db.collection.aggregate([
  {$unwind: "$array_camp"}
])
```

### $group - Agrupar documents
```javascript
// Comptar elements per grup
db.collection.aggregate([
  {$group: {
    _id: "$camp_grup",
    total: {$sum: 1}
  }}
])

// Mitjana per grup
db.collection.aggregate([
  {$group: {
    _id: "$genere",
    mitjana_edat: {$avg: "$edat"}
  }}
])

// Recopilar valors únics
db.collection.aggregate([
  {$group: {
    _id: "$categoria",
    elements: {$addToSet: "$element"}
  }}
])
```

### $project - Seleccionar i transformar camps
```javascript
db.collection.aggregate([
  {$project: {
    _id: 0,                          // Ocultar _id
    nom: 1,                          // Mostrar nom
    num_elements: {$size: "$array"}  // Calcular mida d'array
  }}
])
```

### $match - Filtrar documents
```javascript
db.collection.aggregate([
  {$match: {
    edat: {$gte: 18},
    actiu: true
  }}
])
```

### Exemples Complets d'Agregació

#### Exemple 1: Comptar etiquetes
```javascript
db.people.aggregate([
  {$unwind: "$tags"},              // Separa cada tag
  {$group: {
    _id: "$tags",                  // Agrupa per tag
    vegades: {$sum: 1}             // Compta ocurrències
  }}
])
```

#### Exemple 2: Mitjana d'edat per gènere
```javascript
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
```

#### Exemple 3: Persones amb moltes etiquetes
```javascript
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
```

## 7. Funcions Útils

### Formatació i comptatge
```javascript
// Mostrar resultats en format llegible
db.collection.find().pretty()

// Comptar documents
db.collection.find({criteri: "valor"}).count()
db.collection.countDocuments({criteri: "valor"})

// Limitar resultats
db.collection.find().limit(5)

// Ordenar resultats
db.collection.find().sort({camp: 1})   // Ascendent
db.collection.find().sort({camp: -1})  // Descendent
```

### Projecció de camps
```javascript
// Mostrar només camps específics
db.collection.find(
  {criteri: "valor"},
  {camp1: 1, camp2: 1, _id: 0}
)
```

## 8. Consells Pràctics

### Per a operacions amb arrays:
- Usa `$addToSet` per evitar duplicats
- Usa `$push` si vols permetre duplicats
- `$pop: 1` elimina l'últim element, `$pop: -1` el primer
- `$pull` elimina elements específics per valor

### Per a agregacions:
- Sempre comença amb `$match` per filtrar documents innecessaris
- Usa `$unwind` per treballar amb arrays
- `$group` per agrupar i calcular estadístiques
- `$project` per seleccionar camps i fer càlculs
- L'ordre dels stages importa!

### Expressions regulars útils:
- `^` = inici de cadena
- `$` = final de cadena  
- `i` = case insensitive
- `.` = qualsevol caràcter
- `*` = zero o més repeticions
- `+` = una o més repeticions
- `{n,m}` = entre n i m repeticions
