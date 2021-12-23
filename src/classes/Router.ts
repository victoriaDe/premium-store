/**
 * @module Router
 */

import { TRoute, TRouteCallback } from '@type/router';
import { TCurrency } from '@type/local-storage';

import LocalStorage from '@classes/LocalStorage';
import Item from '@classes/Item';
import NavPanelDOM from '@dom/NavPanelDOM';
import ProductAPI from '@api/ProductAPI';

/**
 * Class to create router with hash support
 */
class Router {
  /** array of saved routes */
  #routes: TRoute[] = [];

  /**
   * Method to change a title of a browser tab
   */
  static #changeTitle(title: string): void {
    document.title = title;
  }

  /**
   * Method to add a route to a router
   * @param hash hash route
   * @param title title of the browser tab
   * @param callback callback function for route
   */
  addRoute(hash: string, title: string, callback: TRouteCallback): Router {
    this.#routes.push({
      hash,
      title,
      callback,
    });
    return this;
  }

  /**
   * Method to create product route while reloading
   * @param hash hash route
   * @param currency product currency
   */
  async createRoute(hash: string, currency: TCurrency): Promise<boolean> {
    const product = await ProductAPI.getProductsByList([hash], currency);
    if (product && product.length) {
      this.addRoute(hash, product[0].data.name, () => {
        LocalStorage.getUserData().then((userData) => {
          if (userData) {
            NavPanelDOM.showMainNavContainer();
            Item.showSelectedItem(product[0], userData);
          }
        });
      });
      window.dispatchEvent(new HashChangeEvent('hashchange'));
      return true;
    }
    return false;
  }

  /**
   * Method to find a route in the array of router saved routes
   * @param hash hash route
   */
  findRoute(hash: string): TRoute | undefined {
    return this.#routes.find((r) => r.hash === hash);
  }

  /**
   * Method get hash
   */
  static #getHash(): string {
    return window.location.hash.slice(1);
  }

  /**
   * Method to initialize the router
   * @param currency product currency
   */
  init(currency: TCurrency) {
    window.addEventListener('hashchange', async () => {
      try {
        const hash = Router.#getHash();
        const route = this.findRoute(hash);
        if (route) {
          route.callback();
          Router.#changeTitle(route.title);
        } else {
          // пробуем создать путь сами
          await this.createRoute(hash, currency);
        }
      } catch (err) {
        alert('Route is incorrect. Please, press OK and you will be forwarded to the main page');
        window.location.hash = '';
      }
    });
  }
}

export default Router;
