import { inject } from 'aurelia-framework';
import Fixtures from './fixtures';
import { TotalUpdate, LoginStatus } from './messages';
import { EventAggregator } from 'aurelia-event-aggregator';
import { Candidate, Donation, User } from './models';

@inject(Fixtures, EventAggregator)
export class DonationService {
  ea: EventAggregator;
  donations: Array<Donation> = [];
  methods: Array<String> = [];
  candidates: Array<Candidate> = [];
  users: Map<string, User>;
  total = 0;

  constructor(data: Fixtures, ea: EventAggregator) {
    this.users = data.users;
    this.donations = data.donations;
    this.candidates = data.candidates;
    this.methods = data.methods;
    this.ea = ea;
  }

  donate(amount: number, method: string, candidate: Candidate) {
    const donation = {
      amount: amount,
      method: method,
      candidate: candidate,
    };
    this.donations.push(donation);
    console.log(
      `${amount} donated to ${candidate.firstName} ${candidate.lastName} : ${
        method
      }`,
    );

    this.total = this.total + amount;
    console.log('Total so far ' + this.total);
    this.ea.publish(new TotalUpdate(this.total));
  }

  addCandidate(firstName: string, lastName: string, office: string) {
    const candidate = {
      firstName: firstName,
      lastName: lastName,
      office: office,
    };
    this.candidates.push(candidate);
  }

  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    this.users.set(email, newUser);
  }

  login(email: string, password: string) {
    const loginStatus = new LoginStatus(false);

    if (this.users[email]) {
      if (this.users[email].password === password) {
        loginStatus.status = true;
        loginStatus.message = 'logged in';
      } else {
        loginStatus.message = 'Incorrect password';
      }
    } else {
      loginStatus.message = 'Unknown user';
    }
    this.ea.publish(loginStatus);
  }

  logout() {
    this.ea.publish(new LoginStatus(false));
  }
}
