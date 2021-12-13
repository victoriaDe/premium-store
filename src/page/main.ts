import {IUser} from '@type/user';
import {IProduct} from '@type/product';

import UserAPI from '@api/user';
import Item from '@scripts/item';
import Shopping from '@scripts/changeUserLists';
import ProductAPI from '@api/product';
import lazy from '@scripts/lazy';

import '@scss/main.scss';
import '@scss/variables/colors.scss';
import '@scss/variables/sizes.scss';
import '@scss/popup.scss';
import '@scss/main-content.scss';
import '@scss/item.scss';
import Filter from '@scripts/filter';

class MainPage {
    #productData: IProduct[] | null = [];

    #userData: IUser | null = null;

    async getData() {
        const localUserData = localStorage.getItem('user');
        if (localUserData) {
            this.#userData = JSON.parse(localUserData);
        } else {
            this.#userData = await UserAPI.getUserByID('61a6286353b5dad92e57b4c0');
            localStorage.setItem('user', JSON.stringify(this.#userData));
        }
        this.#productData = await ProductAPI.getProductsByFilter('All');
        localStorage.setItem('productData', JSON.stringify(this.#productData));
        return [this.#productData, this.#userData];
    }

    static showMainItems(productData: IProduct[], userData: IUser): void {
        const $container: HTMLElement | null = document.getElementById('main');
        let itemCounter = 0;
        productData.forEach((value: IProduct) => {
            if ($container) {
                if (itemCounter < 20) {
                    $container.appendChild(Item.createItem(value, userData, productData));
                    itemCounter += value.span;
                }
            }
        });
    }

    init(): void {
        this.getData()
            .then((data: any[]) => {
                MainPage.showMainItems(data[0], data[1]);
                Shopping.showShoppingList(data[1].shoppingList);
                Shopping.showWishlist(data[1].wishlist);
                return data;
            })
            .then((data) => lazy(20, 100, data[1], data[0], new Item()));
        Filter.addEvent();
    }
}

const main: MainPage = new MainPage();
main.init();


let $wrapper: HTMLElement | null = document.getElementById('popupWrapper');

const $login: HTMLElement | null = document.getElementById('login');
const $create: HTMLElement | null = document.getElementById('create-account');
const $body: HTMLBodyElement | null = document.querySelector('body');


$login?.addEventListener('click', openPopup);
$create?.addEventListener('click', openPopup);
$wrapper?.addEventListener('click', closePopup);

function openPopup() {
    let popup;

    const eventTarget = event?.target as HTMLElement;
    if ($wrapper?.children) $wrapper.innerHTML = '';
    $body?.classList.add('lock');

    switch (eventTarget.id) {
        case 'login':
            popup = new Popup(eventTarget, [['nickname', 'text'], ['password', 'password']], true);
            break;

        case 'create-account':
            popup = new Popup(eventTarget, [['full name', 'text'], ['nickname', 'text'], ['email', 'email'], ['password', 'password']], false);
            break;

        case 'reset-password':
            popup = new Popup(eventTarget, [['email', 'email']], false);
            if ($wrapper) $wrapper.innerHTML = '';
            break;

        default:
            throw new Error('eventTarget has no ID')
    }

    if ($wrapper && popup) {
        $wrapper.appendChild(popup.renderHTML());
        $wrapper.classList.add('opened-popup');
    }
}

function closePopup() {
    const eventTarget = event?.target as HTMLElement;
    $body?.classList.remove('lock');

    if (eventTarget === $wrapper ||
        eventTarget === document.querySelector('.pop-up-container span') ||
        eventTarget === document.querySelector('.pop-up-container button')) {

        $wrapper?.classList.remove('opened-popup');
        if ($wrapper) $wrapper.innerHTML = '';
    }
}

class Popup {
    target: HTMLElement;
    fields: any;
    hasLink: boolean;

    constructor(target: HTMLElement, fields: any, hasLink: boolean) {
        this.target = target;
        this.fields = fields;
        this.hasLink = hasLink;
    }

    createHeader() {
        const title = this.target.id.split('-').join(" ");
        let $header = document.createElement('h2');
        $header.innerText = title;
        return $header;
    }

    createForm() {
        let $form = document.createElement('form');
        $form.classList.add('popup-form');

        for (let i = 0; i < this.fields.length; i++) {
            $form.innerHTML += `<label>${this.fields[i][0]} <input type='${this.fields[i][1]}' placeholder='Enter your ${this.fields[i][0]}'></label>`;
        }

        $form.appendChild(this.createButton());
        if (this.hasLink) $form.appendChild(this.createLink());

        return $form;
    }

    createButton() {
        let $btn = document.createElement('button');
        $btn.type = 'submit';
        $btn.innerText = 'OK';
        return $btn;
    }

    createLink() {
        let $link = document.createElement('a');
        $link.id = "reset-password";
        $link.href = "#";
        $link.classList.add('popup-form-link');
        $link.innerText = 'forgot your password?';
        $link.addEventListener('click', openPopup)
        return $link;
    }

    createSpan() {
        let $cross = document.createElement('span');
        $cross.innerText = 'X';
        return $cross;
    }

    renderHTML() {
        let $container = document.createElement('div');
        $container.classList.add("pop-up-container");

        $container.append(this.createHeader(), this.createSpan(), this.createForm());
        return $container;
    }
}