+++
title = "Oxidation - A Rust Journey: Ownership, Pt. 1"
date = 2021-03-07
description = "The second part in my journey to discover all the Rust programming language has to offer"
[extra]
github = true
twitter = true
+++


Last time, we took a look at the [guessing game][1] from the second chapter of the [Rust book][2]. We learned about variable mutability, shadowing, the `Result` enum, as well as some basic pattern matching and error handling. Today, we are going to take a look at (what I would consider to be) the biggest feature of Rust: Ownership. To quote the book:

<blockquote cite="https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html">
Rust's central feature is <em>ownership</em>. Although the feature is straightforward to explain, it has deep implications for the rest of the language.
</blockquote>

Coming from JavaScript, all I have ever had to concern myself with was the event loop. In Rust, I now have to reason about the stack and the heap. That is to say, I need to be aware of which values I am using, where they are allocated, and when/what rules are in play when I pass arguments to a function or consume some other API.

{% banner() %}
This post is part of a series, you can check out part one <a href="/blog/rust-part-one/">here</a>.
{% end %}

#### The Stack and the Heap

Stacked. Like pancakes. When memory is stack allocated, it follows the first-in-last-out rule. That is to say, when something is allocated on the stack, it's `pushed` onto the top of the stack, and in order to pull something off of the stack, it needs to be `pop`'d off. If you're cooking breakfast in the morning and you're making pancakes, you `push` the freshly made pancake onto the top of the `stack`. When it's time to serve, you `pop` one off the top, and give it to a very grateful consumer.

The gotcha with all stack allocated data is that it must have a known, fixed size at compile time. Everything that does not meet this criteria is instead heap allocated. The tradeoff for this limitation is that pushing to the stack is much faster than it is to allocate memory on the heap, because we never need to search for a place to put something. That fresh pancake will _always_ go right on top of the stack.

The heap, on the other hand, can be thought of as to going to a restaurant for breakfast and trying to find a table:

<blockquote cite="https://doc.rust-lang.org/book/ch04-01-what-is-ownership.html">
When you enter [the restuarant], you state the number of people in your group, and the staff finds an empty table that fits everyone and leads you there. If someone in your group comes late, they can ask where you've been seated to find you.
</blockquote>

In this analogy, your group is the data allocated on the stack, and the server who led you there is a pointer to your location in the restaurant's memory. Now that we've covered the basics, we can get into it!

#### The rules

The ownership rules in Rust are very straightforward, and are as follows:
1. Each value in Rust has a variable that is called its _owner_.
1. There can only be *one* owner at a time.
1. When the owner goes out of scope, that value will be dropped.

This seems simple enough. Let's take a look at some code examples and try to reason about what is happening.

```rs
fn main() {
    let x = "Hello, world!";
    let y = x;

    println!("x = {}, y = {}", x, y); // x = Hello, world!, y = Hello, world!
}
```

So far it's about what we'd expect from other languages. We've initialized some variable, `x` with the string literal `Hello, world!` and then assigned it to `y`.

The reason this works is because string literals and other stack-allocated primitives implement the `Copy` trait. To illustrate this, we can make a small helper function and let the compiler reason about our code for us:

```rs
fn main() {
    let some_copy_value = "hello, world!";
    let result_from_copy = copy_value(some_copy_value);

    println!("{:?}", result_from_copy);
}

fn copy_value<T>(value: T) -> (T, T, T)
where
    T: Copy,
{
    let copy_one = value;
    let copy_two = copy_one;

    (value, copy_one, copy_two)
}
```

This all works fine and dandy, but let's try it again with the heap-allocated `String` type:

```rs
let some_heap_value = String::from(some_copy_value);
let not_working = copy_value(some_heap_value);
```

If we try to compile the above code, we'll get the following error:

```rs
error[E0277]: the trait bound `String: Copy` is not satisfied
  --> src/main.rs:6:34
   |
6  |     let not_working = copy_value(some_heap_value);
   |                                  ^^^^^^^^^^^^^^^ the trait `Copy` is not implemented for `String`
```

But what if we want that data to be inside of another variable? To get around this limitation, Rust allows us to deeply copy the heap-allocated data associated with our `String` via the `.clone()` method.

```rs
fn main() {
    let some_string = String::from("Hello, world");
    let another_string = some_string.clone();

    println!("{}, {}", some_string, another_string);
}
```

Above, all we have done is deeply copied the heap-allocated data from our first `some_string` variable into the `another_string` variable. But what happens if we don't `.clone()` the value, like this:

```rs
fn main() {
    let some_string = String::from("Hello, world");
    let another_string = some_string;

    println!("{}, {}", some_string, another_string);
}

```


If we try to compile this, we'll get the following error:

```rs
error[E0382]: borrow of moved value: `some_string`
 --> src/main.rs:5:24
  |
2 |     let some_string = String::from("Hello, world");
  |         ----------- move occurs because `some_string` has type `String`, which does not implement the `Copy` trait
3 |     let another_string = some_string;
  |                          ----------- value moved here
4 |
5 |     println!("{}, {}", some_string, another_string);
  |                        ^^^^^^^^^^^ value borrowed here after move
```

So what gives? Well, in the previous instances when we've copied data from one variable to another, those values have either been stack-allocated (meaning they can be deeply copied cheaply, since they are of a known, fixed size) or cloned the data into a new variable.

The compilation error we are receiving is because have `moved` the value from `some_string` into `another_string`. A move is different from a shallow copy, because in addition to copying the address of the pointer, the first owner of the data (in this case, `some_string`) is also invalidated, meaning we've simultaneously "broken" all three of Rust's ownership rules.

This is admittedly a lot to take in, so we'll leave it at that for now. Next time we'll take a look at functions, return values, scope, and how all of those interact with ownership.


{% banner() %}
<b>NOTE:</b> This series is all about me learning Rust, so if you happen to read this and discover that I have made some fatal error or have a fundamental misunderstanding of a concept, please feel more than welcome to correct me aggressively!
{% end %}

[1]: https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html
[2]: https://doc.rust-lang.org/book/title-page.html
