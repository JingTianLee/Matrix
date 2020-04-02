/*
 * @Author: ljt1469
 * @Date: 2020-04-02 14:07:51
 * @LastEditTime: 2020-04-02 15:15:08
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
    //如果fast为true，直接将filler赋值给entries属性
    if (fast) {
      this.entries = filler;
    } else {

      this.entries = new Array(this.size);
      //判断filler是否为一个二维数组，并将值赋给entries这个一维数组
      if (Array.isArray(filler)) {
        if (Array.isArray(filler[0])) {
          let num = 0;
          for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
              this.entries[i][j] = filler[num];
              num++;
            }
          }

        } else {
          //如果filler是一维数组并且长度符合要求，将值赋给entries这个一维数组
          if (!(filler.length === this.size)) {
            throw new error("数组元素个数与新建矩阵元素个数不相等")
          } else {
            for (let i = 0; i < this.size; i++) {
              this.entries[i] = filler[i];
            }
          }
        }
      } else {
        for (let i = 0; i < this.size; i++) {
          this.entries[i] = filler;
        }
      }
    }
  }

  /*
   * 获取矩阵类中存储所有元素的一维数组
   * @returns {Array}
   */
  getArray() {
    return this.entries;
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
}