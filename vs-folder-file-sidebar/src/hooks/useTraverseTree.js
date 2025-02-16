const useTraverseTree = () => {
  const cache = new Map();

  const insertNode = (tree, folderId, item, isFolder) => {
    if (cache.has(tree)) return cache.get(tree);

    if (tree.id === folderId && tree.isFolder) {
      const newNode = {
        id: Date.now(),
        name: item,
        isFolder,
        items: [],
      };
      const updatedTree = { ...tree, items: [newNode, ...tree.items] };
      cache.set(tree, updatedTree);
      return updatedTree;
    }

    const updatedTree = {
      ...tree,
      items: tree.items.map((ob) => insertNode(ob, folderId, item, isFolder)),
    };

    cache.set(tree, updatedTree);
    return updatedTree;
  };

  const deleteNode = (tree, folderId) => {
    if (tree.id === folderId) return null;

    const updatedItems = tree.items
      .map((ob) => deleteNode(ob, folderId))
      .filter(Boolean);

    return { ...tree, items: updatedItems };
  };

  const renameNode = (tree, folderId, newName) => {
    if (cache.has(tree)) return cache.get(tree);

    if (tree.id === folderId) {
      const updatedTree = { ...tree, name: newName };
      cache.set(tree, updatedTree);
      return updatedTree;
    }

    const updatedTree = {
      ...tree,
      items: tree.items.map((ob) => renameNode(ob, folderId, newName)),
    };

    cache.set(tree, updatedTree);
    return updatedTree;
  };

  return { insertNode, deleteNode, renameNode };
};

export default useTraverseTree;
