/* ----------- a. Elimina la pel·lícula que en el títol tingui Star Trek. ------------ */
db.movieDetails.deleteMany( {title: /\bStar Trek\b/i } )

// Comprovació
db.movieDetails.find(
{title: /Star Trek/i },
{title: 1, year:1, plot: 1, _id: 0}
)

// Comprovació (alternativa més precisa)
db.movieDetails.find(
{title: /\bStar Trek\b/i },
{title: 1, year:1, plot: 1, _id: 0}
)


/* ------------ b. Elimina la pel·lícula Love Actually. -------------*/
db.movieDetails.deleteOne( { title: "Love Actually" } )

// Comprovació
db.movieDetails.find( { title: "Love Actually" } )


/* ------------ c. Elimina les pel·lícules que en el camp rated tingui "G". ------------ */
db.movieDetails.deleteMany( { rated: "G" } )

// Comprovació
db.movieDetails.find({ rated: "G" })
db.movieDetails.find( { rated: /\bG\b/i } ) // També entra TV-G al que agafa
//db.movieDetails.find( { rated: /G/i } ) -- Aquest no funcionaria ja que retorna tots els que continguin la G, encara q sigui formant part de una altra paraula


/* --------------- d. Elimina les pel·lícules que siguin etiquetades com "Western". ------------ */
db.movieDetails.deleteMany( { genres : "Western" } )

// Comprovació
db.movieDetails.find({ genres : "Western" })


/* ---------------- e. Elimina les pel·lícules que no hagin guanyat cap premi. -------------- */
db.movieDetails.deleteMany({ "awards.wins": 0 })

// Comprovació
db.movieDetails.find({ "awards.wins": 0 })
db.movieDetails.find({ "awards.wins": 0 }).count()


