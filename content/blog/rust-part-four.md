+++
title = "Oxidation - A Rust Journey: Structs"
date = 2021-03-08
description = "A continuation of the Oxidation series, during which we take a look at structs, methods, and associated functions."
[extra]
github = true
twitter = true
+++

Rust is a strongly-typed language. Coming from JavaScript, this has been both a blessing and a curse. It's been a blessing in the sense that, without compile-time type checking, it's a lot easier to shoot yourself in the foot with unforseen consequences at runtime. This has not been without it's drawbacks, however. Wrestling against type checking and learning to structure and organize your code base within the confines of a type system can be infinitely rewarding, but also introduce a level of complexity that may seems overwhelming at first.

{% banner() %}
This post is part of a series, you can check out part three <a href="/blog/rust-part-three/">here</a>.
{% end %}

#### Creating a struct

A struct is a way to combine a set of fields into a single, unified type by declaring key/value pairs with names and their associated type declarations.

```rs
struct Person {
    name: String,
    age: i8,
    location: String,
}
```

In order to use a struct, you must first instantiate it by using curly bracket notation and supplying concretions at the field level for each of the expected types as declared in the struct:

```rs
fn main() {
    let nick = Person {
        name: String::from("Nicholas"),
        age: 28,
        location: String::from("California"),
    };
}

struct Person {
    name: String,
    age: i8,
    location: String,
}
```

Coming from JavaScript, something that will be a pleasure to see is that Rust offers a similar solution to copying values from one struct into another via the `..` or `update` operator:

```rs
fn main() {
    let nick = Person {
        name: String::from("Nicholas"),
        age: 28,
        location: String::from("California"),
    };

    let kylie = Person {
        name: String::from("Kylie"),
        ..nick
    };
}
```

One point that is worth mentioning about the implementation of our struct is that the `String` type is used rather than a `&str`. It is possible for structs to store data owned by something else, but to do so would require _lifetimes_ which we will talk more about at a later time.

#### Associated Functions and Methods

To define an associated function on a `struct` we will have to make use of the `impl` keyword rather than declaring them directly within the `struct` block:

```rs
fn main() {
    let nick = Person::new(String::from("Nicholas"), 28, String::from("California"));
}

struct Person {
    name: String,
    age: i8,
    location: String,
}

impl Person {
    fn new(name: String, age: i8, location: String) -> Self {
        Self {
            name,
            age,
            location,
        }
    }
}
```

If you look closely at the invocation of `Person::new()` you will see that it's quite similar to a static method from other languages.

Method syntax is also quite similar, with one difference: the first parameter in the method signature is always `self`:

```rs
fn main() {
    let nick = Person::new(String::from("Nicholas"), 28, String::from("California"));

    nick.print_name() // Prints: "Nicholas"
}

impl Person {
    fn new(name: String, age: i8, location: String) -> Self {
        Self {
            name,
            age,
            location,
        }
    }

    fn print_name(&self) {
        println!("{}", self.name)
    }
}
```

Something that is worth mentioning is that methods *are* associated functions, and can be invoked as you would call an associated function:

```rs
// this:
nick.print_name();

// is the same as calling:
Person::print_name(&nick);
```

#### Generics

When you define a struct, it's quite possible that you may want to initialize your struct with multiple types. This is where generics come in handy:

```rs
struct Person<T> {
    name: String,
    age: i8,
    location: String,
    favorite_things: Vec<T>,
}

impl<T> Person<T> {
    fn new(name: String, age: i8, location: String, favorite_things: Vec<T>) -> Self {
        Self {
            name,
            age,
            location,
            favorite_things,
        }
    }
}
```

Above, we know that a `Person` will have a name, age, and location of the types we assigned, but what if my `favorite_things` are `i32` and someone else loves `char`? The generic `T` can be used to represent these possible types.

Using generics in combination with guard clauses can become a very powerful way to enforce the same behavior across different types which implement the same Traits:

```rs
struct Person<T>
where
    T: PartialOrd,
{
    name: String,
    age: i8,
    location: String,
    favorite_things: Vec<T>,
}

impl<T> Person<T>
where
    T: PartialOrd,
{
    fn new(name: String, age: i8, location: String, favorite_things: Vec<T>) -> Self {
        Self {
            name,
            age,
            location,
            favorite_things,
        }
    }

    fn biggest_thing(&self) -> &T {
        let mut biggest = &self.favorite_things[0];
        for thing in &self.favorite_things {
            if thing > biggest {
                biggest = thing;
            }
        }
        biggest
    }
}
```

Above, we have put a `where` clause on our generic parameter to dictate that our generic `T` _must_ implement `PartialOrd` so that we can implement our `biggest_thing()` method in the `impl` block. Without this `where` clause, it would be possible for us to substitute types for `T` that would break out `biggest_thing()` implementation, and this saves us from doing that, and allows us to use different types to represent `T`:

```rs
fn main() {
    let nick = Person::new(
        String::from("Nicholas"),
        28,
        String::from("California"),
        vec![8, 2, 22, 4],
    );
    let kylie = Person::new(
        String::from("Kylie"),
        28,
        String::from("Oregon"),
        vec!["k", "o", "c", "p", "v"],
    );

    let nicks_biggest_favorite = nick.biggest_thing();
    let kylies_biggest_favorite = kylie.biggest_thing();

    println!("Nick's biggest: {}", nicks_biggest_favorite)
    println!("Kylie's biggest: {}", kylies_biggest_favorite)
    )
}
```

To summarize, `structs` are the building blocks for creating new types in our program's domain to take full advantage of the powerful compile-time type checking that Rust provides us.


{% banner() %}
<b>NOTE:</b> This series is all about me learning Rust, so if you happen to read this and discover that I have made some fatal error or have a fundamental misunderstanding of a concept, please feel more than welcome to correct me aggressively!
{% end %}

[1]: https://doc.rust-lang.org/book/ch02-00-guessing-game-tutorial.html
[2]: https://doc.rust-lang.org/book/title-page.html
