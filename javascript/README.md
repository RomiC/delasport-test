# Delasport js task

Write an algorithm to solve the following issue

A man has travelled around Bulgaria with buses from town to town. After he arrived at his final destination he had in his bag 10 tickets which were jumbled.
All the tickets had start and end destination written on them. For example one random ticket in his bag was from Plovdiv to Sofia [PLD - SOF]. The man did not visit a town twice and all the towns were with unique names (codes).

Create a proper data model and write an algorithm in JavaScript that will discover the route of the man based on the 10 tickets in his bag.

## Solution

You may find my solution in `index.ts` file. Examples of usage you may find in `index.spec.ts`. To run tests, execute the following command in your terminal:
```sh
npm && npm t
```

### Additional info

Solution consist of the following classes, which could be used to solve the original problem: `Ticket`, `Route`, `Journey`.

#### `Ticket`

Represent the traveller ticket and could create instance of it via calling:
```typescript
import {Ticket} from './index';

const ticket = new Ticket('SOF', 'PLD');

// Available properties
ticket.from; // 'SOF'
ticket.to; // 'PLD'
```

#### `Route`

Represent the route which based on acquired ticket. Could have a link to the next Route:
```typescript
import {Ticket, Route} from './index';

const route1 = new Route(new Ticket('SOF', 'PLD'));
const route2 = new Route(new Ticket('PLD', 'VAR'));

route1.next = route2;

// Available properties
route1.from; // 'SOF'
route1.to; // 'PLD'
route1.next; // route2 {Object}
```

#### `Journey`

Create a journey based on the tickets list. Essentially it's Linked list, which has a list of linked routes under the hood.
It doesn't have any public methods, but its instance could be iterated and represented as a string:
``` typescript
import {Ticket, Journey} from './index';

const journey = new Journey([
  new Ticket('SOF', 'PLD'),
  new Ticket('PLD', 'VAR')
]);

[...journey]; // [Route, Route]
`${journey}`; // 'SOF→PLD→VAR'
```