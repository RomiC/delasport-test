import {Ticket, Route, Journey} from './index';

test('est', () => {
  expect(true).toEqual(true);
});

describe('Journey', () => {
  it('should throw an error on empty list', () => {
    expect(() => new Journey([])).toThrowError('No info about the journey. Tickets list is empty!');
  });

  it('should build a journey from ticket list', () => {
    // 'A-B-C-D';
    const ticketsList = [
      new Ticket('B', 'C'),
      new Ticket('A', 'B'),
      new Ticket('C', 'D'),
    ];
    const journey = new Journey(ticketsList);
    const [r1, r2, r3] = [...journey];

    expect(r1).toBeInstanceOf(Route);
    expect([r1.from, r1.to]).toEqual(['A', 'B']);
    expect(r2).toBeInstanceOf(Route);
    expect([r2.from, r2.to]).toEqual(['B', 'C']);
    expect(r3).toBeInstanceOf(Route);
    expect([r3.from, r3.to]).toEqual(['C', 'D']);

    expect(`${journey.toString()}`).toBe('A→B→C→D');
  });

  it('should throw an error in case of journey break', () => {
    // 'A-B-C...D-E';
    const ticketsList = [
      new Ticket('A', 'B'),
      new Ticket('D', 'E'),
      new Ticket('B', 'C')
    ];
    
    expect(() => new Journey(ticketsList)).toThrowError('Amount of tickets not equals amount of routes. Journey suppose to have a break');
  });
})

describe('export', () => {
  describe('Ticket', () => {
    it('should export class', () => {
      const ticket = new Ticket('A', 'B');

      expect(ticket).toBeInstanceOf(Ticket);
      expect(ticket.from).toBe('A');
      expect(ticket.to).toBe('B');
    });
  });

  describe('Route', () => {
    it('should export class', () => {
      const route = new Route(new Ticket('A', 'B'));

      expect(route).toBeInstanceOf(Route);
      expect(route.from).toBe('A');
      expect(route.to).toBe('B');
    });
  });
});