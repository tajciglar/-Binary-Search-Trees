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
}


const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 161, 20, 22, 0];
const newArray = [...new Set(array)]
newArray.sort((a, b) => a - b)

const tree = new Tree();
tree.buildTree(newArray, 0 , newArray.length-1);

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.rightChild !== null) {
        prettyPrint(node.rightChild, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
        prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


prettyPrint(tree.root);

