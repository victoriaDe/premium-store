const tree: HTMLDivElement | null = document.querySelector('.tree');

/**
 * Функция для удаления ёлки
 */
function deleteTree() {
  tree?.parentNode?.removeChild(tree);
}

tree?.addEventListener('animationend', deleteTree);
