class Node {
    constructor(data){
        this.data = data || null;
        this.rightChild = null;
        this.leftChild = null;
    }
}

class Tree {
    constructor(array){
        this.array = array;
        this.root = null;
    }

    buildTree(array, start, end) {
        if(start>end) return null;
     
        let middle = parseInt((start+end)/2);
        
        let newNode = new Node(array[middle]);

        if (this.root === null) {
            this.root = newNode;
        }
        
        newNode.leftChild = this.buildTree(array, start, middle - 1);
        newNode.rightChild = this.buildTree(array, middle + 1, end);
        
        return newNode;
    }

    insert(value) {
        let element = this.root;
      
        while(element.rightChild !== null || element.leftChild !== null){
            if (element.data > value) {
                element = element.leftChild;
            } else {
                element = element.rightChild;
            }
        }
        if(element.data > value){
            element.leftChild = new Node(value)
        } else {
            element.rightChild = new Node(value)
        }

    }

    delete(value, element = this.root) {
        console.log(this.root);
        if (element === null){
            return element;
        }
        // Traverse the tree
        console.log(this.root);
        if(element.data < value){
            element.rightChild = this.delete(value, element.rightChild)
            
        } else if (element.data > value){
            element.leftChild = this.delete(value, element.leftChild)
        } else {
            if(element.leftChild === null){

                return element.rightChild;

            } else if (element.rightChild === null) {

                return element.leftChild;

            } else {
                
                const min = findMin(element)
                element.data = min.data;
                element.rightChild = this.delete(min.data, element.rightChild);
               
            }
        } 
        return element;
    }

    find(value){
        let root = this.root;
        if (root === null) {
            console.log("Tree is empty");
            return;
        }
        while(value !== root.data){
            
            if(root.data > value){
                root = root.leftChild;
            } else {
                root = root.rightChild;
            }

            if (root === null) {
                console.log("Data doesnt exist");
                return;
            }
        }
    
        console.log("Data found: ", root);
        return root;
    }

    levelOrder(arr = [], queue = [], root = this.root) {
        if (root === null) return;
        // Visit the root
        arr.push(root.data);
        // Traverse to left and right children -> add to queue
        queue.push(root.leftChild);
        queue.push(root.rightChild);
        // Move to next level
        while (queue.length) {
          
          const level = queue[0];
          queue.shift(); // deletes the first one from the queue
          this.levelOrder(arr, queue, level)
        }
  
        return arr;
      }

      inOrder(arr = [], root = this.root){
        if (root === null) return;

        if (root.leftChild){
            this.inOrder(arr, root.leftChild);
        } 
        
        arr.push(root.data);
        
        if(root.rightChild){
            this.inOrder(arr, root.rightChild);
        }
        
        return arr;
      }

       preOrder(arr = [], root = this.root){
        if (root === null) return;

        arr.push(root.data);

        if (root.leftChild){
            this.inOrder(arr, root.leftChild);
        } 
        
        if(root.rightChild){
            this.inOrder(arr, root.rightChild);
        }
        
        return arr;
      }

      postOrder(arr = [], root = this.root){
        if (root === null) return;

        if (root.leftChild){
            this.inOrder(arr, root.leftChild);
        } 
        
        if(root.rightChild){
            this.inOrder(arr, root.rightChild);
        }

        arr.push(root.data);
        return arr;
      }

      height(root){
        if (root === null) return -1;

        let lHeight = this.height(root.leftChild);
        let rHeight = this.height(root.rightChild);

        if (lHeight > rHeight){
            return lHeight + 1;
        } else {
            return rHeight + 1;
        }
      }

      depth(node, root = this.root, depth = 0){
        if (root === null) return;

        if(node === root) return depth;

        if (node.data < root.data){
            return this.depth(node, root.leftChild, depth+=1)
        } else {
            return this.depth(node, root.rightChild, depth+=1)
        }
      }

      isBalanced(root = this.root){
        const heightR = this.height(root.rightChild);
        const heightL = this.height(root.leftChild);

        const difference = heightR - heightL;

        if (difference <= 1 && difference >= -1){
            console.log("Tree is balanced");
        }else {
            console.log("Tree is not balanced");
        }
      }

      rebalance() {
        const array = this.inOrder();
        this.root = this.buildTree(array, 0, array.length-1);
        return this.root;
    }
}

// Function that shows the tree in console
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (!node) {
        return;
    }
    if (node.rightChild !== undefined) {
        prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== undefined) {
        prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


// Array, sort array and remove duplicates
const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 161, 20, 22];
const newArray = [...new Set(array)]
newArray.sort((a, b) => a - b)

// Function to find the minimum 
function findMin(element){
    element = element.rightChild;
    while(element.leftChild !== null) {
        element = element.leftChild;
    }
    return element;
}

// Create a tree
const tree = new Tree();
tree.buildTree(newArray, 0 , newArray.length-1);

tree.isBalanced();
console.log("Level Order", tree.levelOrder());
console.log("Pre Order",tree.preOrder());
console.log("Post Order",tree.postOrder());
console.log("In Order",tree.inOrder());

tree.insert(67);
tree.insert(80);

tree.isBalanced();

prettyPrint(tree.root);
tree.rebalance();
prettyPrint(tree.root)
tree.isBalanced();
console.log("Level Order", tree.levelOrder());
console.log("Pre Order",tree.preOrder());
console.log("Post Order",tree.postOrder());
console.log("In Order",tree.inOrder());