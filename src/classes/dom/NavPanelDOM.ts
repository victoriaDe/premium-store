/**
 * @module DOM
 */

import DOMElems from '@classes/DOMElems';

class NavPanelDOM {
  /**
   * Метод для создания навигационной панели
   */

  static createMainNavContainer() {
    const $mainNavLogo = DOMElems.link({
      classes: 'main-nav-logo',
      href: 'https://worldoftanks.com/',
    });

    const $mainNavLinks = DOMElems.nav({
      classes: 'main-nav-links',
    });

    const linksData = [
      {
        classes: ['main-nav-link', 'hash-link'],
        href: '#all',
        'data-filter': 'All',
        text: 'all',
      },
      {
        classes: ['main-nav-link', 'hash-link'],
        href: '#vehicles',
        'data-filter': 'Technique',
        text: 'vehicles',
      },
      {
        classes: ['main-nav-link', 'hash-link'],
        href: '#gold',
        'data-filter': 'Gold',
        text: 'gold',
      },
      {
        classes: ['main-nav-link', 'hash-link'],
        href: '#premium',
        'data-filter': 'Premium',
        text: 'premium account',
      },
      {
        classes: ['main-nav-link', 'hash-link'],
        href: '#provisions',
        'data-filter': 'Provisions',
        text: 'Consumables',
      },
    ];

    linksData.forEach((data) => {
      const $link = DOMElems.link(data);
      $mainNavLinks.append($link);
    });

    const $mainNavContainer = DOMElems.div({
      classes: 'main-nav-container',
      inner: [$mainNavLogo, $mainNavLinks],
    });

    return $mainNavContainer;
  }

  /**
   * Метод для показа навигационной панели
   */

  static showMainNavContainer() {
    const $mainContainer = document.getElementById('main-container-id');

    const $mainVisualContainer = DOMElems.div({
      id: 'main-visual-container',
    });

    if ($mainContainer) {
      $mainContainer.innerHTML = '';
      $mainContainer.append(NavPanelDOM.createMainNavContainer());
      $mainContainer.append($mainVisualContainer);
    }
  }
}

export default NavPanelDOM;
