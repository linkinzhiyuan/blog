/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * 思路：双向指针，从后往前比较
 * 时间复杂度：O(m+n)
 * 空间复杂度：O(1) 原地修改
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
export const mergeTwoArray = function(nums1: number[], m: number, nums2: number[], n: number): void {
  // 逆向双指针
  let i = m - 1, j = n - 1, k = m + n - 1;
  // 从后向前比较 
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k--] = nums1[i--];
    } else {
      nums1[k--] = nums2[j--];
    }
  }
  // 将nums2剩余的元素添加到nums1中
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
};

/**
 * 思路：在原数组上合并，然后进行冒泡排序
 * 时间复杂度：冒泡排序时间复杂度较高 O((m+n)^2)
 * 空间复杂度：O(n)
 */
export const mergeTwoArrayRefactor = function(nums1: number[], m: number, nums2: number[], n: number): void {
  // 直接更改原数组，改变nums1 数据，末尾添加nums2
  nums1.splice(m, nums1.length - m, ...nums2)
  // 冒泡排序
  for(let i = nums1.length - 1;i > 0;i--){
    for(let j = 0; j < i;j++){
      if(nums1[j] > nums1[j+1]){
        [nums1[j],nums1[j+1]] = [nums1[j+1],nums1[j]]
      }
    }
  }
}

/**
 * 思路：利用两个数组是有序的结构，两个指针分别指向两个数组的头部，比较之后最小的元素向一个新的队列中添加元素
 * 时间复杂度：O(m+n)
 * 空间复杂度：O(m+n)
*/
export const mergeTwoArrayRefactor2 = function(nums1: number[], m: number, nums2: number[], n: number): void {
  const arr:number[] = []
  let i = 0, j = 0;
  while(i<m && j<n){
    if(nums1[i]<nums2[j]){
      arr.push(nums1[i++])
    } else {
      arr.push(nums2[j++])
    }
  }
  while(i<m){
    arr.push(nums1[i++])
  }
  while(j<n){
    arr.push(nums2[j++])
  }
  for (let i = 0; i < m + n; i++) {
    nums1[i] = arr[i];
  }
}
