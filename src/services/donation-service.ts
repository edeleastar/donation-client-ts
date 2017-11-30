import { inject } from 'aurelia-framework';
import AsyncHttpClient from './async-http-client';
import Fixtures from './fixtures';
import { TotalUpdate, LoginStatus } from './messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Candidate, Donation, User } from './models';

@inject(Fixtures, EventAggregator, AsyncHttpClient)
export class DonationService {
  ea: EventAggregator;
  ac: AsyncHttpClient;
  donations: Array<Donation> = [];
  methods: Array<string> = [];
  candidates: Array<Candidate> = [];
  users: Map<string, User> = new Map();
  total = 0;

  constructor(data: Fixtures, ea: EventAggregator, ac: AsyncHttpClient) {
    this.methods = data.methods;
    this.ea = ea;
    this.ac = ac;
    this.getCandidates();
  }

  isAuthenticated() {
    return this.ac.isAuthenticated();
  }

  getCandidates() {
    this.ac.get('/api/candidates').then(res => {
      this.candidates = res.content;
    });
  }

  getUsers() {
    this.ac.get('/api/users').then(res => {
      const users = res.content as Array<User>;
      users.forEach(user => {
        this.users.set(user.email, user);
      });
    });
  }

  donate(amount: number, method: string, candidate: Candidate) {
    const donation = {
      amount: amount,
      method: method,
    };
    this.ac
      .post('/api/candidates/' + candidate._id + '/donations', donation)
      .then(res => {
        let returnedDonation = res.content as Donation;
        returnedDonation.candidate = candidate;
        this.donations.push(returnedDonation);
        console.log(
          `${amount} donated to ${candidate.firstName} ${
            candidate.lastName
          } : ${method}`,
        );

        this.total = this.total + amount;
        console.log('Total so far ' + this.total);
        this.ea.publish(new TotalUpdate(this.total));
      });
  }

  addCandidate(firstName: string, lastName: string, office: string) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office,
    };
    this.ac.post('/api/candidates', candidate).then(res => {
      this.candidates.push(res.content);
    });
  }

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    this.ac.post('/api/users', newUser).then(res => {
      this.getUsers();
    });
  }

  login(email: string, password: string) {
    const user = {
      email: email,
      password: password,
    };
    this.ac.authenticate('/api/users/authenticate', user);
  }

  logout() {
    this.ac.clearAuthentication();
    this.ea.publish(new LoginStatus(false));
  }
}
