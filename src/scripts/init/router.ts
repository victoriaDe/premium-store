import HashRouter from '@classes/HashRouter';
import Wishlist from '@classes/Wishlist';
import ShoppingList from '@classes/ShoppingList';
// import NavPanel from '@classes/NavPanel';
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
    // NavPanel.showMainNavContainer();
    NavPanelDOM.showMainNavContainer();
    Filter.addEvent();
    Filter.filterProducts('All');
  })
  .addRoute('all', 'All products', () => {
    // NavPanel.showMainNavContainer();
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('All');
    Filter.addEvent();
  })
  .addRoute('vehicles', 'Vehicles', () => {
    // NavPanel.showMainNavContainer();
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Technique');
    Filter.addEvent();
  })
  .addRoute('gold', 'Gold', () => {
    // NavPanel.showMainNavContainer();
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Gold');
    Filter.addEvent();
  })
  .addRoute('premium', 'Premium', () => {
    // NavPanel.showMainNavContainer();
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Premium');
    Filter.addEvent();
  })
  .addRoute('provisions', 'Provisions', () => {
    // NavPanel.showMainNavContainer();
    NavPanelDOM.showMainNavContainer();
    Filter.filterProducts('Provisions');
    Filter.addEvent();
  });

export default router;
