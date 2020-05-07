
/**
 * 输出最长的不重复的字串
*/
function lengthOfLongestSubstring(str) {
  let longestStrLength = 0;
  let longestStr = '';
  // let maxStr = '';
  let len = str.length;
  for (let i = 0; i < len; i++) {
    let el = str.charAt(i);
    let elPos = longestStr.indexOf(el)
    if (elPos === -1) {
      longestStr += el
      if (longestStrLength <= longestStr.length) {
        longestStrLength = longestStr.length
        // maxStr = unqiueStr
      }
    } else {
      longestStr = longestStr.substr(elPos + 1) + el
    }
  }
  return longestStrLength

}
// console.log(lengthOfLongestSubstring('asdered'))

/**
 * 两数之和
 */
let twoSum = function (nums, target) {
  let temp = {};
  let pos = [];
  let len = nums.length;
  for (let i = 0; i < len; i++) {
    let sub = target - nums[i]
    if (temp[sub] === undefined) {
      temp[nums[i]] = i
    } else {
      pos = [temp[sub], i]
    }
  }
  return pos
};

// console.log(twoSum([2, 7, 11, 15], 9))

/** 寻找两个有序数组的中位数
* 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
* 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
* 你可以假设 nums1 和 nums2 不会同时为空。
*/

var findMedianSortedArrays = function (nums1, nums2) {
  let arr = nums1.concat(nums2).sort((a, b) => a - b);
  let l = arr.length % 2;
  let len = arr.length
  let odd = arr[(len + 1) / 2 - 1];
  let even = (arr[(len) / 2 - 1] + arr[(len) / 2]) / 2
  if (l) return odd;
  return even;
};
// console.log(findMedianSortedArrays([-1], [2, 3, -4, 5, 6, 7, 8, 9, 10]))

/**给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。*/
function longestPalindrome(s) {
  let len = s.length
  if (s == null || len < 1) return "";
  let start = 0, end = 0;
  for (let i = 0; i < len; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    let len = Math.max(len1, len2);
    if (len > end - start) {
      end = i + len / 2;
      if (len % 2) {
        start = i - (len - 1) / 2;
      } else {
        start = i - len / 2 + 1;
      }
    }
  }
  function expandAroundCenter(s, left, right) {
    let L = left, R = right;
    let len = s.length
    while (L >= 0 && R < len && s.charAt(L) === s.charAt(R)) {
      L--;
      R++;
    }
    return R - L - 1;
  }
  return s.substring(start, end + 1);
}

/**7.给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。*/
var reverse = function (x) {
  const s = Math.abs(x).toString()

  const result = parseInt(s.split('').reverse().join(''))

  return result > Math.pow(2, 31) - 1 ? 0 : (x < 0 ? -result : result)
};

/** 8.字符串转换整数 (atoi)*/
var myAtoi = function (str) {
  let a = parseInt(str)
  if (a) {
    return a > Math.pow(2, 31) - 1 ? Math.pow(2, 31) - 1 : a < -Math.pow(2, 31) ? -Math.pow(2, 31) : a
  } else {
    return 0
  }
};
/**15.三数之和 */
var threeSum = function (nums) {
  let res = []
  let length = nums.length;
  nums.sort((a, b) => a - b) // 先排个队，最左边是最弱（小）的，最右边是最强(大)的
  if (nums[0] <= 0 && nums[length - 1] >= 0) { // 优化1: 整个数组同符号，则无解
    for (let i = 0; i < length - 2;) {
      if (nums[i] > 0) break; // 优化2: 最左值为正数则一定无解
      let first = i + 1
      let last = length - 1
      do {
        if (first >= last || nums[i] * nums[last] > 0) break // 两人选相遇，或者三人同符号，则退出
        let result = nums[i] + nums[first] + nums[last]
        if (result === 0) { // 如果可以组队
          res.push([nums[i], nums[first], nums[last]])
        }
        if (result <= 0) { // 实力太弱，把菜鸟那边右移一位
          while (first < last && nums[first] === nums[++first]) { } // 如果相等就跳过
        } else { // 实力太强，把大神那边右移一位
          while (first < last && nums[last] === nums[--last]) { }
        }
      } while (first < last)
      while (nums[i] === nums[++i]) { }
    }
  }
  return res
};


// console.log(threeSum([0, 1, -2, 0, 1, 2, -1]));
/**
 * 最长公共前缀
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  if (!strs.length) {
    return ''
  }
  let long = ''
  let num = 0
  while (num <= strs[0].length - 1) {
    let cur = strs[0].charAt(num)
    // console.log(cur);
    let equl = true
    for (let i = 1; i < strs.length; i++) {
      const element = strs[i];
      if (element.charAt(num) !== cur) {
        equl = false
        break
      } else {
        equl = true
      }
    }
    if (equl) {
      // long += strs[0].charAt(num)
      long = equl ? long + strs[0].charAt(num) : long
    } else {
      break
    }
    num++;
  }
  return long
};

/**
 * 字符串的排列
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  let left, right;
  let include1 = false
  let include2 = false
  let hash1 = {}
  let hash2 = {}
  let s2hash1 = {}
  let s2hash2 = {}
  let num1 = 0
  let pos = s2.indexOf(s1[0])
  hash2[0] = hash1[0] = s1[0]
  if (s1.length === 1 && pos !== -1) {
    return true
  }
  if (pos === -1) {
    return false
  }
  // for (let i = 0; i < s1.length; i++) {
  // const element = s1[i];
  while (num1 < s1.length - 1) {
    num1++;
    left = s2.charAt(pos - num1)
    right = s2.charAt(pos + num1)

    let b1 = s1.indexOf(left)
    let b2 = s1.indexOf(right)
    if (s2hash1[left]) {
      s2.charAt[pos - num1] = '1'
    }
    if (s2hash2[right]) {
      s2.charAt[pos + num1] = '1'
    }
    if (b1 !== -1) {
      if (hash1[b1] === undefined) {
        hash1[b1] = left
        include1 = true
        s2hash1[left] = b1
      } else {
        include1 = false
      }
    } else {
      include1 = false
    }
    if (b2 !== -1) {
      if (hash2[b2] === undefined) {
        hash2[b2] = right
        include2 = true
        s2hash2[right] = b2
      } else {
        include2 = false
      }
    } else {
      include2 = false
    }
  }
  console.log(include1, include2, s2);
  return include1 || include2
};

// console.log(checkInclusion("prosperity", "properties"));
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function ListNode(val) {
  this.val = val;
  this.next = null;
}
var addTwoNumbers = function (l1, l2) {
  let res
  if (l1.val + l2.val > 9) {
    res.val = new ListNode(Math.floor((l1.val + l2.val) / 10))
  } else {
    res.val = l1.val + l2.val
  }
};


/**
 * 回文数
 * @param {number} x
 * @return {boolean}
 */
//解法一
var isPalindrome = function (x) {
  let a = x + ''
  let len = a.length
  if (len <= 1) {
    return true
  }
  let res = ''
  for (let i = len - 1; i >= 0; i--) {
    res += a.charAt(i)
  }
  return res === a
};
//解法二
var isPalindrome = function (x) {
  let s = 0;
  let y = 0;
  s = x;
  while (s >= 1) {
    y = y * 10 + s % 10;
    s = Math.floor(s / 10)
  }
  return y == x;
}
// console.log(isPalindrome(12231));

/**
 * 删除排序数组中的重复项
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function (nums) {
  let index = 0
  for (let i = 0, len = nums.length; i < len; i++) {
    if (nums[i] != nums[i + 1]) {
      nums[index] = nums[i]
      index++
    }
  }
  return index
};
// console.log(removeDuplicates([1,1,2]));
//输出2-32中不重复的5个数
let arr = [], obj = {}
function getRandom() { return 2 + Math.floor(Math.random() * 31) }
function pushArr(a) {
  if (obj[a] === undefined) {
    if (arr.length < 5) {
      arr.push(a)
      obj[a] = true
      pushArr(getRandom())
    }
  } else {
    pushArr(getRandom())
  }
}
pushArr(getRandom())
// console.log(arr);


//在无限的整数序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...中找到第 n 个数字。
var findNthDigit = function (n) {
  if (n < 10) return n;
  let i = 1, sum = 9
  while (n > sum) {
    sum += 9 * Math.pow(10, i) * (i + 1)
    i++;
  }
  let res = Math.pow(10, i) - Math.floor((sum - n) / i) - 1
  // console.log(Math.round(3 * (1 - ((sum - n) / 3 - Math.floor((sum - n) / 3)))));
  console.log(res, sum);
  let num = Math.round(i * (1 - ((sum - n) / i - Math.floor((sum - n) / i))))
  console.log(num);

  return Number(res.toString()[num - 1])
};

// console.log(findNthDigit(1001))


/**
 * @param {string} s
 * @return {number}
 */
var romanToInt = function (s) {
  let roman = ['I', 'V', 'X', 'L', 'C', 'D', 'M'];
  let len = s.length
  let curIndex = 0;
  let res = 0
  for (let i = len - 1; i >= 0; i--) {
    let ele = s[i]
    let index = roman.indexOf(ele)
    // console.log(ele)
    if (index >= curIndex) {
      res += toInt(ele)
    } else {
      res -= toInt(ele)
    }
    curIndex = index
    // console.log(curIndex)
  }
  return res
};

//罗马数字转整数
function toInt(e) {
  let res;
  switch (e) {
    case 'I':
      res = 1
      break;
    case 'V':
      res = 5
      break;
    case 'X':
      res = 10
      break;
    case 'L':
      res = 50
      break;
    case 'C':
      res = 100
      break;
    case 'D':
      res = 500
      break;
    case 'M':
      res = 1000
      break;
  }
  return res
}

