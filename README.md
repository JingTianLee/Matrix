# Matrix
a tiny matrix library with ES6

You can create a Matrix like this:

```javascript
//you can use a Two-dimensional array and you should decide the size of row and column.Here,a 3*3 matrix is created
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);

//Also, you can use a one-dimensional array
let mat = new Matrix(3,3,[1,2,3,1,2,3,1,2,3])
```

## API

### getOneDimensionArray() & getTwoDimensionArray()

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);

mat.getOneDimensionArray() //[1,2,3,1,2,3,1,2,3]
mat.getTwoDimensionArray() //[[1,2,3],[1,2,3],[1,2,3]]
```

### getRowDimension() & getColumnDimension()

```javascript
let mat = new Matrix(3,2,[[1,2],[1,2],[1,2]]);

mat.getRowDimension()  //3
mat.getColumnDimension()  //2
```

### getMatrixRowArray(rNum, j0, j1) & getMatrixColArray(cNum, i0, i1)

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);

mat.getMatrixRowArray(2, 1, 2)  //[ 2, 3 ]
mat.getMatrixColArray(1, 0, 1)  //[ 2, 2 ]
```

### transpose() & transposeEquals()

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);

let newMat = mat.transpose()  //return a new matrix
newMat.getOneDimensionArray() //  [ 1, 1, 1, 2, 2, 2, 3, 3, 3 ]
mat.getOneDimensionArray() //[1,2,3,1,2,3,1,2,3]

mat.transposeEquals()  //return self
mat.getOneDimensionArray() //  [ 1, 1, 1, 2, 2, 2, 3, 3, 3 ]
```

### trace()

return the trace of the matrix 

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);

mat.trace() // 6
```

### copy()

return a copy of the matrix

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);

let newMat = mat.copy() // 6
```

### plus(), minus(), arrayTimes() & arrayRightDivide() 

add,subtract,multiply and divide between each element within two matrices, and return a new matrix

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);
let mat1 = new Matrix(3,3,[[3,2,1],[3,2,1],[3,2,1]]);

let matAdd = mat.plus(mat1)
matAdd.getOneDimensionArray() //[ 4, 4, 4, 4, 4, 4, 4, 4, 4 ]
let matSub = mat.minus(mat1)
matSub.getOneDimensionArray() // [ -2, 0, 2, -2, 0, 2, -2, 0, 2 ]
let matMul = mat.arrayTimes(mat1)
matMul.getOneDimensionArray() // [ 3, 4, 3, 3, 4, 3, 3, 4, 3 ]
let matDiv = mat.arrayRightDivide(mat1)
matDiv.getOneDimensionArray() //  [ 0.3333333333333333, 1, 3, 0.3333333333333333, 1, 3, 0.3333333333333333, 1, 3 ]
```

### times() & timesEquals()

times() function can get a matrix or scalar, but timesEquals() only can get a scalar.
times() will return a new matrix, and timesEquals() will return self

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);
let mat1 = new Matrix(3,3,[[3,2,1],[3,2,1],[3,2,1]]);

let mat2 = mat.times(3)
mat.getOneDimensionArray() //[ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]
mat2.getOneDimensionArray() // [ 3, 6, 9, 3, 6, 9, 3, 6, 9 ]
mat2 = mat.times(mat1)
mat.getOneDimensionArray()//[ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]
mat2.getOneDimensionArray() //  [ 18, 12, 6, 18, 12, 6, 18, 12, 6 ]

//mat.timesEquals(mat1) this way is wrong
mat.timesEquals(3) 
mat.getOneDimensionArray()//[ 3, 6, 9, 3, 6, 9, 3, 6, 9 ]
```

### copy() 

return a copy of the matrix 

```javascript
let mat = new Matrix(3,3,[[1,2,3],[1,2,3],[1,2,3]]);
let mat1 = mat.copy()

mat.getOneDimensionArray() //[ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]
mat1.getOneDimensionArray() // [ 1, 2, 3, 1, 2, 3, 1, 2, 3 ]

```