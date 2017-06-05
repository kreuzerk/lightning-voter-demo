import { UpgradeModule } from '@angular/upgrade/static';
import { downgradeInjectable, downgradeComponent } from '@angular/upgrade/static';
// this is done to make sure that typescript knows about all the rxjs operations
import './app/rxjsOperations';

import { AppModuleNgFactory } from '../aot/public/app/app.module.ngfactory'
import { NameParser } from "./app/admin/nameParser.service";
import { UnreviewedTalkComponent } from "./app/home/unreviewedTalk.component";
import { platformBrowser } from "@angular/platform-browser";

declare var angular: angular.IAngularStatic;

platformBrowser().bootstrapModuleFactory(AppModuleNgFactory).then(platformRef => {
  // upgrades & downgrades
  angular.module('app')
    .factory('nameParser', downgradeInjectable(NameParser))
    .directive('unreviewedTalk', downgradeComponent({
      component: UnreviewedTalkComponent
    }))

  const upgrade = platformRef.injector.get(UpgradeModule) as UpgradeModule;
  upgrade.bootstrap(document.documentElement, ['app']);
  console.log('hybrid app bootstrapped');
})
