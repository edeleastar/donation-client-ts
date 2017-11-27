import { Candidate, Donation, User } from './models';

export default class Fixtures {
  baseUrl = 'http://localhost:4000';
  methods = ['Cash', 'PayPal'];

  candidates: Array<Candidate> = [
    {
      firstName: 'Lisa',
      lastName: 'Simpson',
      office: 'President',
    },
    {
      firstName: 'Bart',
      lastName: 'Simpson',
      office: 'President',
    },
  ];

  donations: Array<Donation> = [
    {
      amount: 23,
      method: 'cash',
      candidate: this.candidates[0],
    },
    {
      amount: 212,
      method: 'paypal',
      candidate: this.candidates[1],
    },
  ];

  users: Map<string, User> = new Map()
    .set('homer@simpson.com', {
      firstName: 'Homer',
      lastName: 'Simpson',
      email: 'homer@simpson.com',
      password: 'secret',
    })
    .set('marge@simpson.com', {
      firstName: 'Marge',
      lastName: 'Simpson',
      email: 'marge@simpson.com',
      password: 'secret',
    });
}
