class Navigation {
  static createMainNavContainer(): HTMLElement {
    const $mainNavContainer = document.createElement('div');
    $mainNavContainer.classList.add('main-nav-container');
    $mainNavContainer.innerHTML = `       
            <a class="main-nav-logo"></a>
            <nav class="main-nav-links">
                <button class="main-nav-link" type="submit" data-filter="all">all</button>
                <button class="main-nav-link" type="submit" data-filter="vehicles">vehicles</button>
                <button class="main-nav-link" type="submit" data-filter="gold">gold</button>
                <button class="main-nav-link" type="submit" data-filter="premium">premium account</button>
                <button class="main-nav-link" type="submit" data-filter="provisions">Шляпа</button>
            </nav>       
    `;
    return $mainNavContainer;
  }

  static showMainNavContainer() {
    const $mainContainer: HTMLElement | null =
      document.getElementById('main-container-id');
    const $mainVisualContainer = document.createElement('div');
    $mainVisualContainer.innerHTML = '<div id="main-visual-container"></div>';

    if ($mainContainer) {
      $mainContainer.innerHTML = '';
      $mainContainer.append(this.createMainNavContainer());
      $mainContainer.append($mainVisualContainer);
    }
  }
}

export default Navigation;
