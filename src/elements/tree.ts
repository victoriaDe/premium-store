/**
 * Method to delete christmas-tree after animation
 */

const tree: HTMLDivElement | null = document.querySelector('.tree');
tree?.addEventListener('animationend', deleteTree);

function deleteTree() {
  tree?.parentNode?.removeChild(tree);
}
