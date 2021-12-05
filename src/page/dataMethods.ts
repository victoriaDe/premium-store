import { productData, Product } from '@page/itemList';

interface UserData {
  wishList: Product[];
  shopping: Product[];
}

const userDate: UserData = {
  wishList: [
    {
      productDescription: {
        span: '2',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 3,
    },{
      productDescription: {
        span: '2',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 3,
    },{
      productDescription: {
        span: '2',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 3,
    },
    {
      productDescription: {
        span: '2',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 4,
    },
    {
      productDescription: {
        span: '1',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 6,
    },
  ],
  shopping: [
    {
      productDescription: {
        span: '2',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 3,
    },
    {
      productDescription: {
        span: '2',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 4,
    },
    {
      productDescription: {
        span: '1',
        name: 'ИС-6',
        type: '',
        country: '',
        description:
          'Premium Account allows to research desirable vehicles quicker and to save time on its purchase. It gives more Credits and Experience per battle.  It is a great deal as the profit after paying for repairs and ammo increases two- or threefold, depending on your performance in battle (amount of damage, destroyed enemies, base captured/defended, ' +
          'enemies detected, etc).',
      },
      productImage:
        'https://ru-wotp.wgcdn.co/dcont/fb/image/r165_object_703_ii_1300_big_1.png',
      productCost: '$ 58.99',
      productID: 6,
    },
  ],
};

class DataMethods {
  static getProductData() {
    return productData;
  }

  static getUserData() {
    return userDate;
  }
}

export { UserData, DataMethods };
