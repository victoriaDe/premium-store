const tree: HTMLDivElement | null = document.querySelector('.tree');

tree?.addEventListener('animationend', deleteTree);

function deleteTree() {
  // console.log(tree);
  // console.log('----------');
  tree?.parentNode?.removeChild(tree);

  // console.log(tree);
  // console.log('----------');

}
