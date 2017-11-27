import { inject, Aurelia } from 'aurelia-framework';
import { RouterConfiguration, Router } from 'aurelia-router';
import { EventAggregator } from 'aurelia-event-aggregator';

@inject(Aurelia, EventAggregator)
export class App {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'login'],
        name: 'login',
        moduleId: 'components/login',
        nav: true,
        title: 'Login',
      },
      {
        route: 'signup',
        name: 'signup',
        moduleId: 'components/signup',
        nav: true,
        title: 'Signup',
      },
    ]);
    this.router = router;
  }
}
