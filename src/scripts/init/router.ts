import HashRouter from '@classes/HashRouter';
import Wishlist from '@classes/Wishlist';
import ShoppingList from '@classes/ShoppingList';
import Navigation from '@classes/Navigation';
import Filter from '@scripts/filter';

const router = new HashRouter();

router
  .addRoute('wishlist', 'Wishlist', () => {
    Wishlist.createWishlist();
  })
  .addRoute('shoppingcart', 'Shopping cart', () =>
    ShoppingList.createShoppingList(),
  )
  .addRoute('', 'Premium Store', () => {
    Navigation.showMainNavContainer();
    Filter.addEvent(router);
    Filter.filterProducts('All', router);
  })
  .addRoute('all', 'All products', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('All', router);
    Filter.addEvent(router);
  })
  .addRoute('vehicles', 'Vehicles', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Technique', router);
    Filter.addEvent(router);
  })
  .addRoute('gold', 'Gold', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Gold', router);
    Filter.addEvent(router);
  })
  .addRoute('premium', 'Premium', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Premium', router);
    Filter.addEvent(router);
  })
  .addRoute('provisions', 'Provisions', () => {
    Navigation.showMainNavContainer();
    Filter.filterProducts('Provisions', router);
    Filter.addEvent(router);
  });

export default router;
