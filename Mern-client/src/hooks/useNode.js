const useNode = () => {
  //  const insertNode = function (tree, commentId, item) {
  //    if (tree.id === commentId) {
  //      tree.items.push({
  //        id: new Date().getTime(),
  //        name: item,
  //        items: [],
  //      });
 
  //      return tree;
  //    }
 
  //    let latestNode = [];
  //    latestNode = tree.items.map((ob) => {
  //      return insertNode(ob, commentId, item);
  //    });
 
  //    return { ...tree, items: latestNode };
  //  };

  const insertNode = function (tree, commentId, item) {
    if (tree.id === commentId) {
      // Initialize tree.items if it's undefined
      if (!tree.items) {
        tree.items = [];
      }
      
      tree.items.push({
        id: new Date().getTime(),
        name: item,
        items: [],
      });
  
      return tree;
    }
  
    // Ensure tree.items is an array
    if (!Array.isArray(tree.items)) {
      tree.items = [];
    }
  
    let latestNode = [];
    latestNode = tree.items.map((ob) => {
      return insertNode(ob, commentId, item);
    });
  
    return { ...tree, items: latestNode };
  };
  
 
   const editNode = (tree, commentId, value) => {
     if (tree.id === commentId) {
       tree.name = value;
       return tree;
     }
 
     tree.items.map((ob) => {
       return editNode(ob, commentId, value);
     });
 
     return { ...tree };
   };
 
   const deleteNode = (tree, id) => {
     for (let i = 0; i < tree.items.length; i++) {
       const currentItem = tree.items[i];
       if (currentItem.id === id) {
         tree.items.splice(i, 1);
         return tree;
       } else {
         deleteNode(currentItem, id);
       }
     }
     return tree;
   };
 
   return { insertNode, editNode, deleteNode };
 };
 
 export default useNode;