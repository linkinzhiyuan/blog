export class RandomizedSet {
  setObj: Set<number>;
  constructor() {
    this.setObj = new Set();
  }

  insert(val: number): boolean {
    if(this.setObj.has(val)) {
      return false;
    }
    this.setObj.add(val);
    return true;
  }

  remove(val: number): boolean {
    if(!this.setObj.has(val)) {
      return false;
    }
    this.setObj.delete(val);
    return true;
  }

  getRandom(): number {
    const arr = Array.from(this.setObj);
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
  }
}

/**
* Your RandomizedSet object will be instantiated and called as such:
* var obj = new RandomizedSet()
* var param_1 = obj.insert(val)
* var param_2 = obj.remove(val)
* var param_3 = obj.getRandom()
*/


export class RandomizedSetHashMap {
  map: Map<number, number>;
  arr: number[];

  constructor() {
    this.map = new Map();
    this.arr = new Array();
  }

  insert(val: number): boolean {
    if(!this.map.has(val)) {
      this.arr.push(val);
      this.map.set(val, this.arr.length - 1);
      return true;
    }
    return false;
  }

  remove(val: number): boolean {
    if(this.map.has(val)) {
      const index = this.map.get(val) as number;
      const last = this.arr[this.arr.length - 1];
      this.arr[index] = last;
      this.map.set(last, index);
      this.arr.pop();
      this.map.delete(val);
      return true;
    }
    return false;
  }

  getRandom(): number {
    const randomIndex = Math.floor(Math.random() * this.arr.length);
    return this.arr[randomIndex];
  }
}