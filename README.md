# Wordle in Estonian

A clone of [Wordle](https://www.nytimes.com/games/wordle/index.html) built with [Next.js](https://nextjs.org/). It's a WIP.

## How to Run

The app expects the following environment variables to be set:

| Name | Description | Example Value |
|--|--|--|
| `START_TIMESTAMP` | Unix timestamp to be considered as the start of "day one" | `1645567200` for W, Feb 23, 2022 12:00:00 AM GMT+02:00 |
| `NEW_SOLUTION_AFTER` | seconds after which we switch to the next solution | `86400` for 24h |

There's a `.env.example` with some defaults for your convenience. Copy it to `.env`, for example.

All valid answers (the wordlist) live in `static/words.js`. Solutions are picked from `static/solutions.js` (a subset of the wordlist). Edit it to your liking.

To start the app locally run:

```bash
npm run dev
```

And open [http://localhost:3000](http://localhost:3000) to start playing.

## Attribution

* All valid answers (5 letter Estonian words) were filtered from [EKI's Scrabble wordlist](https://www.eki.ee/litsents/) (licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)).
* The app uses some SVG icons from [Bootstrap](https://icons.getbootstrap.com/) (licensed [MIT](https://github.com/twbs/icons/blob/main/LICENSE.md)).
