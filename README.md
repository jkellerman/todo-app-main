# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Links

- Solution URL: [Solution](https://github.com/jkellerman/todo-app-main)
- Live Site URL: [Live Site](https://jkellerman.github.io/todo-app-main/)

## My process

### Built with

- Semantic HTML5 markup
- SASS
- Vanilla JavaScript

### What I learned

There were a number of challenges to tackle in this small application, however the main ones for myself were using local storage to save any changes made to the todo list, and using drag and drop to reorder the list. I originally looked into the drag and drop api and learned about how to use events such as dragstart, dragover and dragend. However, I discovered Sortable JS library which made the drag & drop far easier to work with, so I used this in the end.

### Continued development

As localstorage and drag and drop were two new things I was trying to dive into for this project, I decided to not focus on the gradient border, I know with this I would have to use a span as background or overlay on the checkbox and style it so that it appears when I hover over the list item or checkbox.

### Useful resources

- [SortableJS](https://github.com/SortableJS/Sortable)

## Author

Josh Kellerman - Website coming soon
