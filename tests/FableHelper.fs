[<AutoOpenAttribute>]
module FableHelper

#if FABLE_COMPILER
open Fable.Mocha
#else
open Expecto
#endif

let ftestCase = ftestCase
let testCase = testCase
let testList = testList

module Expect =
    let inline equal actual expected message = Expect.equal actual expected message
    let inline throws f message = Expect.throws f message
    let inline hasLength seq expectedLength message = Expect.hasLength seq expectedLength message
    let inline isTrue actual message = Expect.isTrue actual message