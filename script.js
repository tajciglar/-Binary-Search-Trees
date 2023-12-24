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
                console.log(element.data);
                element = element.leftChild;
                console.log(element)
            } else {
                console.log(element.data);
                element = element.rightChild;
                console.log(element)
            }
        }
        if(element.data > value){
            element.leftChild = new Node(value)
        } else {
            element.rightChild = new Node(value)
        }
        console.log(this.root);

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

// Create a tree
const tree = new Tree();
tree.buildTree(newArray, 0 , newArray.length-1);



// Function to find the minimum 
function findMin(element){
    element = element.rightChild;
    while(element.leftChild !== null) {
        element = element.leftChild;
    }
    return element;
}

prettyPrint(tree.root);
tree.insert(40);
prettyPrint(tree.root);
tree.insert(27)
prettyPrint(tree.root);
tree.insert(21)

prettyPrint(tree.root);

prettyPrint(tree.root);
tree.delete(22)
prettyPrint(tree.root);
tree.find(23);


