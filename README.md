# Dicacle

## Scope

Must support list (syntax taken from [DiceMaiden](https://github.com/Humblemonk/DiceMaiden#how-to-use)):

- `3d6 + 1d11 + 15w20`: base case, roll any number of any sided dice.
- `3d6 + 15`: add flat boni to dice rolls.

Sets:
- `(1d20 + 14) (1d20 + 14) (1d20 + 9)`: roll 3 sets and only sum inside set.
- `2 (1d20 + 14) (1d20 + 9)`: roll 2 sets of 1d20+14 and one of 1d20+9. 

For one diceroll (e.g. `3d6`) you can mix between categories below but never multiples of the same category.

- Not allowed: ~~`3d6 k2 kl2`~~
- Allowed: `3d6 k1 ie6 r2`: roll 3d6, reroll any 1 or 2 once, explode rolled 6, then keep highest.

Order of execution: `Reroll` --> `Explode` --> `Keep/Drop`.

Keep/Drop:
- `3d6 k1`/`3d6 kh1`: roll 3d6, keep the best. Used for advantage.
- `3d6 kl2`: roll and keep lowest 2 results.
- `3d6 d1`/`3d6 dl1`: roll 3d6, drop the lowest.
- `3d6 dh2`: roll 3d6, drop the highest 2 results.

Explode:
- `3d6 e6`: roll 3d6 and explode on six or higher __once__.
- `3d6 ie6`: roll 3d6 and explode on six or higher indefinetly (max 100).

Reroll:
- `3d6 r2`: reroll any die equal to 2 or below 2 __once__.
- `3d6 ir2`: reroll any die equal to 2 or below 2 indefinetly (max 100).

## Requirements

* [dotnet SDK](https://www.microsoft.com/net/download/core) v7.0 or higher
* [node.js](https://nodejs.org) v18+ LTS

## Development

Before doing anything, start with installing npm dependencies using `npm install`.

Then to start development mode with hot module reloading, run:
```bash
npm start
```
This will start the development server after compiling the project, once it is finished, navigate to http://localhost:8080 to view the application .

To build the application and make ready for production:
```
npm run build
```
This command builds the application and puts the generated files into the `deploy` directory (can be overwritten in webpack.config.js).

### Tests

To run the tests using the command line, you have to use the mocha test runner which doesn't use the browser but instead runs the code using node.js:
```
npm test
```