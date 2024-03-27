module Dice.Controller

/// Main parsing function, parses string to dice and rolls.
let diceAndRoll(input:string) =
    let rnd = new System.Random()
    let now = System.DateTime.Now
    let sets = Parsing.parseGeneralDice (input,now)
    let rolled = sets.rollBy rnd
    rolled


