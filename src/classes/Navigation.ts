class Navigation {
  static createMainNavContainer(): HTMLElement {
    const $mainNavContainer = document.createElement('div');
    $mainNavContainer.classList.add('main-nav-container');
    $mainNavContainer.innerHTML = `       
            <a class="main-nav-logo"></a>
            <nav class="main-nav-links">
                <a class="main-nav-link" href="#all" data-filter="all">all</a>
                <a class="main-nav-link" href="#vehicles" data-filter="vehicles">vehicles</a>
                <a class="main-nav-link" href="#gold" data-filter="gold">gold</a>
                <a class="main-nav-link" href="#premium" data-filter="premium">premium account</a>
                <a class="main-nav-link" href="#provisions" data-filter="provisions">Шляпа</a>
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
