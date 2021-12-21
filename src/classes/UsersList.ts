// /**
//  * @module UsersList
//  */
//
// import { IProduct } from '@type/product';
// import { IUser } from '@type/user';
// import { TPage } from '@type/users-list';
//
// import Item from '@classes/Item';
// import Wishlist from '@classes/Wishlist';
//
// import { humanPrice } from '@scripts/price';
// import LocalStorage from '@classes/LocalStorage';
//
// /**
//  * Класс для создания DOM элементов
//  */
//
// class UsersList {
// /**
//  * Метод для создания шапки на страницах корзины и списка желаний
//  * @param title заголовок шапки
//  */
//
// static createListHeader(title: string): HTMLDivElement {
//   const $header = document.createElement('div');
//   $header.innerHTML = `${title}`;
//   $header.classList.add('list-header-container');
//   return $header;
// }
//
// /**
//  * Метод для создания пустых страниц корзины и списка желаний
//  * @param text выводимый на странице текст
//  */
//
// static createEmptyList(text: string): HTMLDivElement {
//   const $item = document.createElement('div');
//   $item.classList.add('item-filtered-container');
//   $item.innerHTML = `<div class="empty-list">${text}</div>`;
//   return $item;
// }
//
//   static async createUsersList(page: TPage) {
//     const addedProducts = await LocalStorage.getListData(page);
//     const user = await LocalStorage.getUserData();
//
//     const $container = document.createElement('div');
//     $container.classList.add('items-filtered');
//     $container.id = 'items-filtered';
//     const $wrapper = document.querySelector('.main-container');
//
//     if ($wrapper) {
//       $wrapper.innerHTML = '';
//       if (user && addedProducts) {
//         addedProducts.forEach((product) => {
//           $container.append(UsersList.createAddedItem(product, user, page));
//         });
//         if (page === 'shoppingList') {
//           const $totalContainer = document.createElement('div');
//           $totalContainer.classList.add('total-container');
//
//           $totalContainer.innerHTML = `
//           <p class="total-price">
//         Total:
//         <span>100 500$</span>
// </p>
//         <button class="total-button">buy</button>
//           `;
//
//           $container.append($totalContainer);
//         }
//
//         $wrapper.append($container);
//       } else {
//         $wrapper.append(
//           UsersList.createEmptyList(
//             `${page === 'wishlist' ? 'Wishlist' : 'Shopping List'} is empty`,
//           ),
//         );
//       }
//       $wrapper.append(
//         UsersList.createListHeader(
//           page === 'wishlist' ? 'Wishlist' : 'Shopping List',
//         ),
//       );
//     }
//   }
// }
//
// export default UsersList;
