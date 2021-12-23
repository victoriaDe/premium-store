/**
 * Function to delete christmas-tree after animation
 */

const tree: HTMLDivElement | null = document.querySelector('.tree');

function deleteTree() {
  tree?.parentNode?.removeChild(tree);
}

tree?.addEventListener('animationend', deleteTree);
