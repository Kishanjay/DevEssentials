# (S)CSS tips and tricks
CSS can be written in lots of different ways. 
The key is to write something that remains managable over time. 
Be consistent in the writing style.

---
## Best practices
Somethings that might work

---
## Tricks

##### Sticky-nav
Any (top) navbar can easily made sticky by adding the following snippet
```css
.navbar {
    // navbar style 
    // ..
    // ..
    height: 100px;
}
.navbar--sticky {
    position: fixed;
    top: 0px;
    left: 0px;
    right: 0px;
}
/* targeting every element after the navbar */
.navbar--sticky + * {
    padding-top: 100px;
    // margin-top: 100px;
}
```
