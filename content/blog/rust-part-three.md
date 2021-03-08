+++
title = "Oxidation - A Rust Journey: Ownership, Pt. 2"
date = 2021-03-07
description = "A continuation of the rust language journey, this time taking a look at ownership as it applies to functions and scope"
[extra]
github = true
twitter = true
+++

Memory management in Rust is dictated by a set of three straightforward rules that have far-reaching implications for you as an engineer when it comes to the implementation of your solutions. Last time, we discussed the basics of these rules as they related to `String` types as well as their primitive `&str` or `string literal` counterparts.

To recap, variables that are stack-allocated, or have a fixed, known size at compile time are variables which "are Copy", meaning they can be cheaply copied by value. Heap-allocated data, by comparison, must be copied via the `.clone()` method if you are looking to assign a new variable which owns that deeply copied data. Additionally, we touched on the idea of a `move` in Rust and how it compares to shallow copies from other languages. Today, we'll be taking a more in-depth look at copy and move as it applies to functions and their return values.

{% banner() %}
This post is part of a series, you can check out part two <a href="/blog/rust-part-two/">here</a>.
{% end %}

#### Functions - how do they work?

Previously I mentioned that one of the rules of ownership dictate that once the owner of a value goes out of scope, that value will be dropped.

```rs
// `num` does not exist yet
{
    let num = 5; // here, `num` is valid

}                // `num` is now invalid after this line
```

One of the most obvious cases in which a value could potentially leave scope is when it is being passed into a function. Just like variable assignment, values that are passed into a function can either `move` or `copy`:

```rs
fn main() {
    // 1. `str` is initialized
    let str = String::from("Hello, world!");

    // 2. `str` is moved into the `new_owner` function
    new_owner(str);

    // 5. error - `str` is no longer in valid
    println!("{}", str);
}

// 3. `new_owner` takes ownership of the `str` variable
fn new_owner(str: String) {
    println!("{}", my_str);
} // 4. the owner of `str` goes out of scope
```

Above, we are passing a value `str` of type `String` into the function `new_owner`. Since `String` is not Copy, the value of `str` is moved into the function, and that function becomes the owner of that data. Once the function has executed, the data associated with the variable `str` goes out of scope, and the memory is freed. If we were to change the type of `str` from `String` to `&str`, we would be able to compile this without error, as the `&str` type _is_ Copy:

```rs
fn main() {
    // 1. `my_str` is of type `&str`
    let my_str = "Hello, world!";

    // 2. `my_str` is copied into `new_owner`
    new_owner(my_str);

    // 5. the value `my_str` is printed
    println!("{}", my_str);
}

// 3. the value `my_str` is copied
fn new_owner(my_str: &str) {
    println!("{}", my_str);
} // 4. the copied value is dropped
```

It's a subtle difference, but a very important one!

#### Returning ownership

Until now, we've only dealt with functions that have no return type in their signature. That is to say, once a value enters that function, nothing is returned back, and therefore the values passed into that function are dropped once they go out of scope. Using return values, we may pass data by value into a function and return it back into the scope which it has been invoked while retaining the data in memory:

```rs
fn main() {
    let first_owner = String::from("Hello, world!");

    let new_owner = gives_ownership_back(first_owner);

    println!("{}", new_owner);
}

fn gives_ownership_back(my_str: String) -> String {
    println!("{}", my_str);

    my_str
}
```

While this is all fine and good, it can get out of hand quickly if all we want to do is calculate some return value based on input. Let's say we wanted to find the length of our input string:

```rs
fn main() {
    let first_owner = String::from("Hello, world!");

    let (_second_owner, length_of_str) = get_length(first_owner);

    println!("{}", length_of_str);
}

fn get_length(s: String) -> (usize, String) {
    let length_of_str = s.len();

    (length_of_str, s)
}
```

Above, all we really care about is the `usize` that contains the length of our string, but unfortunately for us we still need to return ownership of the original `String`, thus we've returned a tuple type containing a `String` and a `usize`.

#### Borrowing

To avoid having to constantly return tuple types whenever we want to pass a value into a function, we can simply `borrow` the data by passing a reference instead of by value:

```rs
fn main() {
    let first_owner = String::from("Hello, world!");

    // the `&` means we are borrowing `first_owner`
    let length_of_str = get_length(&first_owner);

    println!("our string: {} has length: {}", first_owner, length_of_str);
}
// our function now receives a reference to `String`
fn get_length(s: &String) -> usize {
    s.len()
}
```

This has solved the problem of needing to explicitly return ownership of the arguments our functions receive, but what about cases in which we want to mutate our value?

Thinking back to the basics, all variables in Rust are immutable by default, so in order to mutate values we first need to explicitly notate that our initial value is mutable, in addition to notating that our function will be receiving a mutable reference to that data:

```rs
fn main() {
    let mut first_owner = String::from("Hello, world!");

    let length_of_str = get_length(&mut first_owner);

    println!("our string: {} has length: {}", first_owner, length_of_str);
}

fn get_length(s: &mut String) -> usize {
    s.push_str(" it's a beautiful day!");

    s.len()
}
```

Above, we have indicated that our variable `first_owner` is mutable using the `mut` keyword, and have likewise updated both the signature of our `get_length` function and the invocation itself to notate that we are passing a mutable reference via the `&mut` keyword.

This is quite a bit to take in, so I think it's a good stopping point for now. There are more rules to discuss involving mutable references and how Rust protects us from dangling pointers and data races which we will get into next time we discuss ownership and lifetimes.

Thanks for reading and joining me on this journey! Until next time ~

{% banner() %}
<b>NOTE:</b> This series is all about me learning Rust, so if you happen to read this and discover that I have made some fatal error or have a fundamental misunderstanding of a concept, please feel more than welcome to correct me aggressively!
{% end %}

[1]: https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html
[2]: https://doc.rust-lang.org/book/title-page.html
