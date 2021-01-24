export class Ticket {
  /**
   * Create a ticket instance
   * @param from Origin place abbreviation
   * @param to Destination place abbreviation
   */
  constructor(readonly from: string, readonly to: string) {}
}

export class Route {
  /**
   * Create route instance
   * @param ticket Ticket's route
   */
  constructor(private ticket: Ticket) {}

  public next: Route | null = null;

  get from() {
    return this.ticket.from;
  }

  get to() {
    return this.ticket.to;
  }
}

export class Journey {
  /**
   * Create the journey instance
   * @param tickets List of the tickets
   */
  constructor(private tickets: Ticket[]) {
    if (tickets.length === 0) {
      throw new Error('No info about the journey. Tickets list is empty!');
    }

    let first = new Route(tickets.splice(0, 1)[0]);

    let curTicket: Ticket | undefined;

    // Looking for head
    let cur = first;
    while (curTicket = tickets.find(({to}) => cur.from === to)) {
      const prevRoute = new Route(curTicket);
      prevRoute.next = cur;
      cur = prevRoute;
    }
    this.head = cur;

    // Looking for tail
    cur = first;
    while (curTicket = tickets.find(({from}) => cur.to === from)) {
      cur = cur.next = new Route(curTicket);
    }

    if (tickets.length > [...this].length - 1) {
      throw new Error('Amount of tickets not equals amount of routes. Journey suppose to have a break');
    }
  }

  private head: Route | null;
  // private tail: Route | null;


  *[Symbol.iterator]() {
    let cur = this.head;

    while (cur !== null) {
      yield cur;
      cur = cur.next;
    }
  }

  toString(): string {
    return [...this].reduce((res, item, index) => `${res}${index === 0 ? item.from : ''}→${item.to}`, '');
  }
}
