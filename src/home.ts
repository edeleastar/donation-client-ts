import { RouterConfiguration, Router } from 'aurelia-router';

export class Home {
  router: Router;

  configureRouter(config: RouterConfiguration, router: Router) {
    config.map([
      {
        route: ['', 'home'],
        name: 'donate',
        moduleId: 'components/donate',
        nav: true,
        title: 'Donate',
      },
      {
        route: 'report',
        name: 'report',
        moduleId: 'components/report',
        nav: true,
        title: 'Report',
      },
      {
        route: 'logout',
        name: 'logout',
        moduleId: 'components/logout',
        nav: true,
        title: 'Logout',
      },
    ]);
    this.router = router;
  }
}
