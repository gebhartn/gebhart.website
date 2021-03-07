+++
title = "Oxidation - A Rust Journey"
date = 2021-03-06
description = "My journey to learn the Rust language"
[extra]
github = true
twitter = true
+++

I got my first taste of programming from a bootcamp I attended in 2019/2020 where I learned the basics of web development. HTML/CSS, JavaScript, and eventually working with Express and React to build full stack web applications. While I was attending, I often heard it said that once you learn one programming language, you know them all. I think we'll put this mantra to the test by trying to learn Rust.

Perhaps Rust would make more sense if I had a background in systems programming, or maybe looking at Rust with fresh eyes is exactly what will enable me to succeed in this task, since I'll be free from the burden of how I believe things ought to work in C++ or C. At any rate, I am going to be writing a multi-part series of blog posts to document my step-by-step journey into the Rust language as I work through [the book][2], and any associated projects I write along the way.

I don't claim this will be unique, nor will I likely have any meaningful input to contribute to the text aside from the perspective of learning a systems language as not only a novice engineer, but as someone whose primary mode of work has always been JavaScript. Join me, as I attempt to oxidize my brain!

#### Guessing Game

The first project in the [Rust book][2] is a [guessing game][1]. We start off by allowing a user to input a guess:

```rs
use std::io;

fn main() {
    println!("Guess the number!");
    println!("Please input your guess.");

    let mut guess = String::new();

    io::stdin()
        .read_line(&mut guess)
        .expect("Failed to read line");

    println!("You guessed: {}", guess)
}
```

Let's go through this bit by bit, and touch on some of the key takeaways here.

```rs
let mut guess = String::new();
```

All variables in Rust are immutable by default, so we must notate that `guess` is mutable. The above line will create a mutable variable that is bound to an instance of an empty `String` type.

```rs
io::stdin()
    .read_line(&mut guess)
    .expect("Failed to read line");
```

The `io::stdin()` function returns an instance of the `Stdin` struct that implements the `.read_line` function. The `.read_line` function borrows a mutable reference to a string and appends the message from stdin to our `guess` variable, then returns an `io::Result` enum. The `Result` enum has two variants: `Ok` and `Err`. If we succeed, our `guess` string is mutated and receives the value from stdin via the `Ok` handler. If it fails, the `Err` variant is returned, and we "handle" the error with the `.expect` method (which is implemented on `io::Result`) and panic.

Now that we have a way to grab a guess from the user, we must compare the guess to a random number.

```rs
use rand::Rng;
use std::io;

// ...

println!("Please input your guess.");

let secret_number = rand::thread_rng().gen_range(1, 101);
println!("The secret number: {}", secret_number);

let mut guess = String::new();

// ...
```

Here, we've added the rand crate (version 0.5.6) and we are using it to generate a new random number between 1 and 101.

The `rand::thread_rng()` part returns a `ThreadRng` struct which implements the `.gen_range` method. Let's look at the implementation of `.gen_range`:

```rs
fn gen_range<T: PartialOrd + SampleUniform>(&mut self, low: T, high: T) -> T
```

Some of the type signature is a bit beyond my grasp for now, but I think it's safe to assume that it's generic over ~some~ equivalent T. We can confirm this by trying to pass a `float` as one of the arguments:

```rs
let secret_number = rand::thread_rng().gen_range(1, 101.0);
```

And when we try to compile, we get the following error:

```rs
error[E0308]: mismatched types
 --> src/main.rs:8:57
  |
8 |     let secret_number = rand::thread_rng().gen_range(1, 101.0);
  |                                                         ^^^^^ expected integer, found floating-point number
```

Cool. So long as both arguments are integers we are in business. Let's continue. You can find out more through the `cargo doc --open` command, as mentioned in the book:

<blockquote cite="https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html">
Note: You won’t just know which traits to use and which methods and functions to call from a crate. Instructions for using a crate are in each crate’s documentation. Another neat feature of Cargo is that you can run the cargo doc --open command, which will build documentation provided by all of your dependencies locally and open it in your browser. If you’re interested in other functionality in the rand crate, for example, run cargo doc --open and click rand in the sidebar on the left.
</blockquote>

Continuing on, we'll need some way of comparing our secret number to our guess.

```rs
use rand::Rng;
use std::cmp::Ordering;
use std::io;

// ...

match guess.cmp(&secret_number) {
    Ordering::Less => println!(""),
    Ordering::Greater => println!(""),
    Ordering::Equal => println!(""),
}
```

Above, we are using the `match` keyword to perform some pattern matchings on the possible outcomes to compare our `guess` to our `secret_number`. The match keyword expects exhaustive matching, meaning that all possible variants returned by the enum must be accounted for in some capacity.

This is all fine and good, except for one thing:

```rs
error[E0308]: mismatched types
  --> src/main.rs:20:21
   |
20 |     match guess.cmp(&secret_number) {
   |                     ^^^^^^^^^^^^^^ expected struct `String`, found integer
   |
   = note: expected reference `&String`
              found reference `&{integer}`
```

Womp womp! Ultimately the issue is that our secret number is an integer, as we discussed earlier, but our guess is a `String` type. Shadowing to the rescue!

```rs
// ...

println!("You guessed: {}", guess);

let guess: i32 = guess.trim().parse().expect("Please type a number");

match guess.cmp(&secret_number) {
    Ordering::Less => println!("Too small"),
    Ordering::Greater => println!("Too large"),
    Ordering::Equal => println!("You win!"),
}
```

Shadowing allows us to reuse a variable name rather than forcing us to create a new variable once we've coerced our string into an integer. So, in order, we are first trimming the whitespace from our guess. When a user presses the return key to submit their guess, a newline character is appended to the string, and since numbers must contain only numerical characters, we have to satisfy this condition. Next, we call `.parse()` to cast our string type into the i32 that we declare when we initialize the shadowed variable. Since `.parse()` returns a `Result` we again call `.expect()` to handle cases when a user enters a string of non-numerical characters.


Lastly, we can finish up our game by removing our print statement for the secret number, wrapping everything up inside of a loop, and breaking when the user enters the correct guess. Our completed guessing game looks like this:

```rs
use rand::Rng;
use std::cmp::Ordering;
use std::io;

fn main() {
    println!("Guess the number!");

    let secret_number = rand::thread_rng().gen_range(1, 101);

    loop {
        println!("Please input your guess.");

        let mut guess = String::new();

        io::stdin()
            .read_line(&mut guess)
            .expect("Failed to read line");

        println!("You guessed: {}", guess);

        let guess: i32 = guess.trim().parse().expect("Please type a number");

        match guess.cmp(&secret_number) {
            Ordering::Less => println!("Too small"),
            Ordering::Greater => println!("Too large"),
            Ordering::Equal => {
                println!("You win!");
                break;
            }
        }
    }
}
```

But hold on, there's just one more gotcha. Since we're relying on `.expect()` to parse or string into an integer, if a user enters an invalid guess, the entire program panics and crashes. Using pattern matching again, we can clean this up into a better user experience. We replace our shadowed `guess` variable with the following:

```rs
let guess: i32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => {
        println!("Only numbers are valid guesses");
        continue;
    }
};
```

Above, we have exhaustive matching as dictated by the `match` keyword and handle or happy path by returning the integer, or printing an error message and continuing our loop in the error case.

All things considered, this was a pretty painless introduction to the language and a great first step.

[1]: https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html
[2]: https://doc.rust-lang.org/book/title-page.html
