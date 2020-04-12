---
date: "2019-04-11"
title: "My Endorsement Trials"
template: "post"
path: "/fake-blog-post-two"
---

As a part of getting endorsed by Lambda School, and upon completion of the web core track and a two month journey through computer science, you must complete a series of trials to determine if you've got what it takes to go out into the world and start working.

One of those steps is gathering up your career artifacts & building a portfolio. Another is to pass a behavioral interview. The next two are substantially more interesting -- A timed HackerRank challenge & two associated technical interviews.

As of writing this, I've just completed my HackerRank challenge and I am waiting to have my follow-up interview to discuss my solutions. In the meantime, I wanted to share the problems I solved and my thought process during the assessment.

## Go time

I received an e-mail with a link to the assessment the evening before I began. It's time-gated so I couldn't open it up and read the problems before starting. Additionally, as far as I know, each challenge is different, to help ensure academic honesty. My challenge consisted of four problems and a four hour time limit. The problems were as follows:

1. Compute the Nth Fibonacci number and return an array of Fibonacci numbers from [0.. N]
2. Remove the Nth element from the end of a Linked List
3. Balanced brackets with a twist, brackets included [] {} () ||
4. Given an array and a target integer, find 3 integers whose sum is the target integer, and return a 2-dimensional array of all unique triplets.

#### Fibonacci

This one was relatively straightforward, so I was happy to see it at the top of the list. It's a very classic example of recursion and a great introduction to dymanic programming. Since, in this case, we are returning an array of numbers anyways, we can use a cache to store our seen values and then return that cache as our result.

```javascript
// fibList :: Int -> [Int]
const fibList = (n) => {
  const cache = [0, 1];

  for (let i = 1; i < n - 1; i++) {
    let result = cache[i] + cache[i - 1];
    cache.push(result);
  }
  return cache;
};
```

Our runtime here is O(n) instead of the O(2^n) from the traditional recursive solution. Since we're returning a list anyways, using the extra space for our cache is no problem!

#### Remove from a linked list

The objective of this is to remove the Nth node from the end of the linked list and return the head of the new Linked List.

I am ashamed to say this one gave me a little bit of trouble. Mostly because I failed the first step of solving problems: understanding the question. My initial reaction to this was to immediately start plugging away and only when I ran my code did I realize I was counting from the front, rather than the back. Womp womp.

```javascript
// removeNth :: Node -> Int -> Node
const removeNth = (head, n) => {
  if (head === null) return null;
  let fast = head;
  let slow = head;

  for (let i = 0; i < n; i++) {
    fast = fast.next;
  }

  if (fast === null) {
    head = head.next;
    return head;
  }

  while (fast.next !== null) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;

  return head;
};
```

Here, we use two pointers to determine the node that we need to remove from the list. We first start by incrementing our fast pointer n times, and then incrementing fast and slow until we reach the end of the list. Once we've reached the end, we've found the node we want to remove from our list, and all we have to do is assign the pointer to the next node in our list, and garbage collection will do the rest.

### Balanced brackets

This is a common problem, but this was the first time I had seen it with pipe characters. The objective is to return a boolean such that our input string contains balanced brackets.

```javascript
// balancedBrackets :: String -> Bool
const balancedBrackets = (string) => {
  const brackets = {
    "[": "]",
    "{": "}",
    "(": ")",
    "<": ">",
    reverse: {
      "]": "[",
      "}": "{",
      ")": "(",
    },
  };
  const demon = "|";
  const arr = string.split("");
  let isDemon = false;

  const clean = arr.map((character) => {
    if (character in brackets || character in brackets.reverse) {
      return character;
    } else if (character === demon) {
      if (!isDemon) {
        isDemon = true;
        return "<";
      } else {
        isDemon = false;
        return ">";
      }
    }
  });

  // Now that we've cleaned up the input string, it's simple
  // to implement the algorithm
  const stack = [];
  const len = clean.length;
  for (let i = 0; i < len; i++) {
    let current = clean[i];
    if (current in brackets) {
      stack.push(brackets[current]);
    } else {
      if (stack.pop() !== current) {
        return false;
      }
    }
  }
  return !stack.length ? true : false;
};
```

The most challenging part about this was sanitizing the inputs. I did not complete this one in the alloted time, because the pipe characters were throwing me for a loop. The idea is to use a flag to determine if a pipe is an "opening" or a "closing" bracket, while we are sanitizing the input string for non-bracket characters. From there, all we have to do is add a placeholder string such that we can balance our brackets as usual.


### Three sum triplets

Initially, this problem seemed a lot more daunting than it actually is. The objective is to find all unique triplets such that the sum of all three elements equal the target value.

```javascript
// threeSum :: [Int] -> Int -> [[Int]]
const threeSum = (arr, n) => {
  const result = [];
  const sorted = arr.sort((a, b) => a - b);
  const len = arr.length;
  for (let i = 0; i < len; i++) {
    let low = i + 1;
    let high = len - 1;
    while (low < high) {
      if (sorted[i] + sorted[low] + sorted[high] === n) {
        result.push([sorted[i], sorted[low], sorted[high]]);
        low++;
        high--;
      } else if (sorted[i] + sorted[low] + sorted[high] < n) {
        low++;
      } else {
        high--;
      }
    }
  }
  return result;
};
```

This is pretty simple once you understand the problem. The idea here is to treat it as you would the two sum problem. We first start by incrementing the array, and for each fixed i, initialize a high and low pointer and use them to compare sums against our target value. If we've found a match, increment low, decrement high, and keep on rolling. If we're a bit low, we'll increment our low pointer looking for a larget integer, otherwise we're overshooting, and we need to drop our high pointer looking for a lower integer.

The caveat here is that our input list needs to be sorted first. The benefit here is twofold. Firstly, it's the only way that we can ensure that we're checking valid comparisons (Think binary search), and secondly, the problem statement indicated that our result must be in ascending order by the 0th element of the nested arrays. Nice.

## Closing thoughts

To clarify, I don't insist that my solutions are the best, or even that they're good. These were not my first attempts at solving these problems, and during the course of the exam I had a lot of frustrated moments when I'd get a solution in my REPL only to run it against the test cases and be thwarted. They're solutions, sure, but that's really just the tip of the iceberg. It took me over four hours to solve four problems, but it also took months of learning to think in a new way just to have the know-how to attempt these. Keep that in mind when if you're struggling through these algorithms.

Overall, I thought this was exactly tuned to my problem solving capabilities as they stand today, and it was a nice curve of problems. One gimme, one simple problem that tripped me up because I didn't read carefully, one problem I thought was simple that turned out to be a challenge, and one that I thought was a challenge that turned out to be relatively straightforward.

I'm excited to be moving forward with endorsement, and I might even do some more HackerRank this weekend just to get some more practice in. Here's to you, Lambda School!

