import HashRouter from '@classes/HashRouter';
import Wishlist from '@classes/Wishlist';
import ShoppingList from '@classes/ShoppingList';
import Filter from '@classes/Filter';
import NavPanelDOM from '@classes/dom/NavPanelDOM';

const router = new HashRouter();

router
  .addRoute('wishlist', 'Wishlist', () => {
    Wishlist.createWishlist();
  })
  .addRoute('shoppingcart', 'Shopping cart', () =>
    ShoppingList.createShoppingList(),
  )
  .addRoute('', 'Premium Store', () => {
    NavPanelDOM.showMainNavContainer();
    Filter.addEvent();
    Filter.filterProducts('All');
  })
  .addRoute('all', 'All products', () => {
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('All');
    Filter.addEvent();
  })
  .addRoute('vehicles', 'Vehicles', () => {
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Technique');
    Filter.addEvent();
  })
  .addRoute('gold', 'Gold', () => {
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Gold');
    Filter.addEvent();
  })
  .addRoute('premium', 'Premium', () => {
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Premium');
    Filter.addEvent();
  })
  .addRoute('provisions', 'Provisions', () => {
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Provisions');
    Filter.addEvent();
  });

export default router;
