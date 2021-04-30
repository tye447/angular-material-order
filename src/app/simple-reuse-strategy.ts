import {RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle} from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable()
export class SimpleReuseStrategy implements RouteReuseStrategy {

  cacheRouters: { [key: string]: any } = {};

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    if (!route.data.keep) {
      return false;
    } else {
      return true;
    }
  }

  store(route: ActivatedRouteSnapshot, thisHandle: DetachedRouteHandle): void {
    this.cacheRouters[route.routeConfig.path] = {
      snapshot: route,
      handle: thisHandle
    };
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    if (route.routeConfig.path === 'login') {
      this.cacheRouters = {};
    }
    return !!route.routeConfig && !!this.cacheRouters[route.routeConfig.path];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
    if (!route.routeConfig || route.routeConfig.loadChildren || !this.cacheRouters[route.routeConfig.path]) {
      return null;
    }
    return this.cacheRouters[route.routeConfig.path].handle;

  }

  shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
    return future.routeConfig === curr.routeConfig;
  }


}
