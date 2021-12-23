/**
 * @module Others
 */

const tree: HTMLDivElement | null = document.querySelector('.tree');

/**
 * Function to delete christmas-tree after animation
 */
function deleteTree() {
  tree?.parentNode?.removeChild(tree);
}

tree?.addEventListener('animationend', deleteTree);
