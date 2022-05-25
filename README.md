# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
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
- SCSS
- JavaScript

### What I learned

There were a number of challenges to tackle in this small application, however the main ones were using local storage to save any changes made to the todo list including whether a todo is checked, added, deleted or reordered. I originally looked into the drag and drop api for reordering lists and learned about how to use events such as dragstart, dragover and dragend. However, I discovered Sortable JS library which made the drag & drop far easier to work with, so I resorted to this method.

For the theme switching, I used 'prefers-color-scheme' in my scss files so that dark or light theme is automatically rendered on the users first visit to the page if they have color scheme preferences set on their browser. If they don't, it will render the light theme and the user will be able to switch to their preferred theme which will then be saved to local storage.

As a bonus, I also learned how to create a linear-gradient border for each checkbox. There isn't a simple way to do this as you can not add this kind of styling to checkboxes. Instead, I used a span as a background on top of another to make it appear as if there is a border, all while making sure it complied with accessibility standards.

### Useful resources

- [SortableJS](https://github.com/SortableJS/Sortable)
- [CSS Tricks](https://css-tricks.com/gradient-borders-in-css/)
