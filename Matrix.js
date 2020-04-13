/*
 * @Author: ljt1469
 * @Date: 2020-04-02 14:07:51
 * @LastEditTime: 2020-04-13 13:49:18
 * @Description: 该文件创建了一个矩阵类，用于实现矩阵的转置以及获取矩阵每一行或每一列的值。矩阵中的下标均从0开始
 */
class Matrix {
  /*
   * 矩阵类的构造函数
   * @param {m} int 矩阵的行数
   * @param {n} int 矩阵的列数
   * @param {filler} Array 默认为0。
   * @param {fast} bool 默认为false
   */
  constructor(m, n, filler = 0, fast = false) {
    this.m = m;
    this.n = n;
    this.size = m * n;
		this.isMatrix = true;
		this.A = null;
    //如果fast为true，直接将filler赋值给entries属性
    if (fast) {
      this.entries = filler;
    } else {
			//如果初始没有给出filler，将filler设置为0，将在最后一个else中给this.entries全部赋为0
			if ( !filler ) {
        filler = 0;
      }
      this.entries = new Array(this.size);
      //判断filler是否为一个二维数组，并将值赋给entries这个一维数组
      if (Array.isArray(filler)) {
        if (Array.isArray(filler[0])) {
          let num = 0;
          if (!(filler.length === this.m)){
            throw new Error("数组维度与创建矩阵维度不符");
          }
					for (let i = 0; i < this.m; i++) {
            if (!(filler[i].length === this.n)) {
              throw new Error("数组维度与创建矩阵维度不符")
            }
						for (let j = 0; j < this.n; j++) {
							this.entries[num] = filler[i][j];
							num++;
            }
          }
					this.A = filler;	
        } else {
          //如果filler是一维数组并且长度符合要求，将值赋给entries这个一维数组
          if (!(filler.length === this.size)) {
            throw new Error("数组元素个数与新建矩阵元素个数不相等")
          } else {
            for (let i = 0; i < this.size; i++) {
              this.entries[i] = filler[i];
            }
						this._exchangeEntriesToA();
          }
        }
      } else {
				//此时filler为0
        for (let i = 0; i < this.size; i++) {
          this.entries[i] = filler;
        }
				this._exchangeEntriesToA();
      }
    }
  }

  /*
   * 获取矩阵类中存储所有元素的一维数组
   * @returns {Array}
   */
  getOneDimensionArray() {
    return this.entries;
  }

	/*
   * 获取矩阵类中存储所有元素的二维数组
   * @returns {Array}
   */
	getTwoDimensionArray() {
    this._exchangeEntriesToA()
    return this.A;
  }

  /*
   * 获取矩阵的行数
   * @returns {int}
   */
  getRowDimension() {
    return this.m;
  }

  /*
   * 获取矩阵的列数
   * @returns {int}
   */
  getColumnDimension() {
    return this.n;
  }

  /*
   * 获取矩阵的下标为(i,j)的元素在entries数组中的序号
   * @returns {int}
   */
  index(i, j) {
    return i * this.n + j;
  }

  /*
   * 获取矩阵的下标为(i,j)的元素
   * @param {i} int 矩阵的行数
   * @param {j} int 矩阵的列数
   * @returns 
   */
  get(i, j) {
    return this.entries[this.index(i, j)];
  }

   /*
   * 设置矩阵的下标为(i,j)的元素的值
   * @param {i} int 矩阵的行数
   * @param {j} int 矩阵的列数
   * @param {s} 要设置的值
   */
  set(i, j, s) {
    this.entries[this.index(i, j)] = s;
  }

  /*
   * 获得矩阵的某一行全部元素或者某一行的切片
   * @param {rNum} int 行号
   * @param {j0} int 该行的起始元素的序号，默认为0，即从该行的第一个元素开始
   * @param {j1} int 该行的结束元素的序号，默认为矩阵总列数-1，即到该行最后一个元素结束
   * @returns {result} Array 返回这一行的数组
   */
  getMatrixRowArray(rNum, j0=0, j1=this.n-1) {
		if(j0< 0){
			throw new Error("行号最小值为0")
		}
		if(j1 > this.n-1){
			throw new Error("行号不得超过该行最后一个元素的行号")
		}
    let len = j1 - j0 + 1;
    let result = new Array(j1 - j0 + 1);
    for (var j = 0; j < len; j++) {
      result[j] = this.entries[this.index(rNum, j0 + j)];
    }
    return result;
  }

  /*
   * 获得矩阵的某一列全部元素或者某一列的切片
   * @param {cNum} int 列号
   * @param {j0} int 该列的起始元素的序号，默认为0，即从该列的第一个元素开始
   * @param {j1} int 该列的结束元素的序号，默认为矩阵总行数-1，即到该列最后一个元素结束
   * @returns {result} Array 返回这一列的数组
   */
  getMatrixColArray(cNum, i0=0, i1=this.m-1) {
		if(i0< 0){
			throw new Error("列号最小值为0")
		}
		if(i1 > this.m-1){
			throw new Error("列号不得超过该行最后一个元素的行号")
		}
    let len = i1 - i0 + 1;
    let result = new Array(i1 - i0 + 1);
    for (var i = 0; i < len; i++) {
      result[i] = this.entries[this.index(i + i0, cNum)];
    }
    return result;
  }

  /*
   * 获得矩阵的转置
   */
  transpose() {
    let result = new Matrix(this.n, this.m);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        result.entries[result.index(j, i)] = this.entries[this.index(i, j)];
      }
    }
    return result;
  }

  /*
   * 获得矩阵的转置
   */
  transposeEquals() {
    let result = new Matrix(this.n, this.m);
    for (let i = 0; i < this.m; i++) {
      for (let j = 0; j < this.n; j++) {
        result.entries[result.index(j, i)] = this.entries[this.index(i, j)];
      }
    }
    for(let k=0;k<result.entries.length;k++){
      this.entries[k] = result.entries[k];
    }
    return this;
  }

	/*
   * 检查矩阵的维度
   */
	checkMatrixDimensions( matrix ) {
    if ( matrix.m !== this.m || matrix.n !== this.n ) {
      throw new Error( '两个矩阵的维度必须相等' );
    }
  }
	
	/*
   * 矩阵的加法，返回一个新的矩阵
   */
	plus( matrix ) {
    this.checkMatrixDimensions( matrix );
    let result = new Matrix( this.m, this.n );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = result.index( i, j );
        result.entries[ index ] = this.entries[ index ] + matrix.entries[ index ];
      }
    }
    return result;
  }
	
	/*
   * 矩阵的加法，返回矩阵本身
   */
	plusEquals( matrix ) {
    this.checkMatrixDimensions( matrix );
    let result = new Matrix( this.m, this.n );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = result.index( i, j );
        this.entries[ index ] = this.entries[ index ] + matrix.entries[ index ];
      }
    }
    return this;
  }
	
	/*
   * 矩阵的减法，返回一个新的矩阵
   */
  minus( matrix ) {
    this.checkMatrixDimensions( matrix );
    let result = new Matrix( this.m, this.n );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = this.index( i, j );
        result.entries[ index ] = this.entries[ index ] - matrix.entries[ index ];
      }
    }
    return result;
  }

	/*
   * 矩阵的减法，返回矩阵本身
   */
  minusEquals( matrix ) {
    this.checkMatrixDimensions( matrix );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = this.index( i, j );
        this.entries[ index ] = this.entries[ index ] - matrix.entries[ index ];
      }
    }
    return this;
  }

	/*
   * 矩阵元素间的乘法，返回一个新的矩阵
   */
  arrayTimes( matrix ) {
    this.checkMatrixDimensions( matrix );
    let result = new Matrix( this.m, this.n );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = result.index( i, j );
        result.entries[ index ] = this.entries[ index ] * matrix.entries[ index ];
      }
    }
    return result;
  }

	/*
   * 矩阵元素间的乘法，返回矩阵本身
   */
  arrayTimesEquals( matrix ) {
    this.checkMatrixDimensions( matrix );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = this.index( i, j );
        this.entries[ index ] = this.entries[ index ] * matrix.entries[ index ];
      }
    }
    return this;
  }
	
	/*
   * 矩阵元素间的除法，此时矩阵作为被除数，返回一个新的矩阵
   */
  arrayRightDivide( matrix ) {
    this.checkMatrixDimensions( matrix );
    var result = new Matrix( this.m, this.n );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = this.index( i, j );
        result.entries[ index ] = this.entries[ index ] / matrix.entries[ index ];
      }
    }
    return result;
  }
	
	/*
   * 矩阵元素间的除法，此时矩阵作为被除数，返回矩阵本身
   */
  arrayRightDivideEquals( matrix ) {
    this.checkMatrixDimensions( matrix );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = this.index( i, j );
        this.entries[ index ] = this.entries[ index ] / matrix.entries[ index ];
      }
    }
    return this;
  }
	
	/*
   * 矩阵元素间的除法，此时矩阵作为除数，返回一个新的矩阵
   */
  arrayLeftDivide( matrix ) {
    this.checkMatrixDimensions( matrix );
    let result = new Matrix( this.m, this.n );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = this.index( i, j );
        result.entries[ index ] = matrix.entries[ index ] / this.entries[ index ];
      }
    }
    return result;
  }

	/*
   * 矩阵元素间的除法，此时矩阵作为除数，返回矩阵本身
   */
  arrayLeftDivideEquals( matrix ) {
    this.checkMatrixDimensions( matrix );
    for ( let i = 0; i < this.m; i++ ) {
      for ( let j = 0; j < this.n; j++ ) {
        let index = this.index( i, j );
        this.entries[ index ] = matrix.entries[ index ] / this.entries[ index ];
      }
    }
    return this;
  }
	
	/*
   * 矩阵乘以一个常数s，返回矩阵本身
   */
	timesEquals( s ) {
      for ( let i = 0; i < this.m; i++ ) {
        for ( let j = 0; j < this.n; j++ ) {
          let index = this.index( i, j );
          this.entries[ index ] = s * this.entries[ index ];
        }
      }
      return this;
  }
	
	times( matrixOrScalar ) {
    let result;
    let i;
    let j;
    let k;
    let s;
    let matrix;
    if ( matrixOrScalar.isMatrix ) {
      matrix = matrixOrScalar;
      if ( matrix.m !== this.n ) {
        throw new Error( 'Matrix inner dimensions must agree.' );
      }
      result = new Matrix( this.m, matrix.n );
      let matrixcolj = new Array( this.n );
      for ( j = 0; j < matrix.n; j++ ) {
        for ( k = 0; k < this.n; k++ ) {
          matrixcolj[ k ] = matrix.entries[ matrix.index( k, j ) ];
        }
        for ( i = 0; i < this.m; i++ ) {
          s = 0;
          for ( k = 0; k < this.n; k++ ) {
            s += this.entries[ this.index( i, k ) ] * matrixcolj[ k ];
          }
          result.entries[ result.index( i, j ) ] = s;
        }
      }
      return result;
    }else {
      s = matrixOrScalar;
      result = new Matrix( this.m, this.n );
      for ( i = 0; i < this.m; i++ ) {
        for ( j = 0; j < this.n; j++ ) {
          result.entries[ result.index( i, j ) ] = s * this.entries[ this.index( i, j ) ];
        }
      }
      return result;
    }
  }
	
	copy() {
      let result = new Matrix( this.m, this.n );
      for ( let i = 0; i < this.size; i++ ) {
        result.entries[ i ] = this.entries[ i ];
      }
      return result;
  }
	
	/*
   * 矩阵的迹
   */
	trace() {
    let t = 0;
    for ( let i = 0; i < Math.min( this.m, this.n ); i++ ) {
      t += this.entries[ this.index( i, i ) ];
    }
    return t;
  }
	
	_exchangeEntriesToA(){
		this.A = new Array(this.m);
		let num = 0;
    for (let i = 0; i < this.m; i++) {
      this.A[i] = new Array(this.n);
      for (let j = 0; j < this.n; j++) {
        this.A[i][j] = this.entries[num];
        num++;
      }
    }
	}
	
	//静态方法
	
	/*
   * 生成单位矩阵
   */
	static Identity( m, n ) {
    let result = new Matrix( m, n );
    for ( let i = 0; i < m; i++ ) {
      for ( let j = 0; j < n; j++ ) {
        result.entries[ result.index( i, j ) ] = (i === j ? 1.0 : 0.0);
      }
    }
    return result;
  }
}

module.exports = Matrix;