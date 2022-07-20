# Pumpkin

Simple and easy to use, lib of component for vueJs3 writing with composition API

Goal => no Jquery and smallest number of dependencies possible.

## components

### pumpkin-tags
Small VueJs component "contenteditable div" who can correctly handle hashtag.

the div is editable and detect hashtag, it trigger an event with the hastag text.
You can simply search the word with your own api and change the list of available tags.

#### status
Doing

### pumpkin-crumbs

A breadCrumb

#### status
Available


### pumpkin-intersection

intersection wrapper component based on https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API


#### status
Doing

### pumpkin-stepper

Stepper

#### status
To do

### pumpkin-summary

summary component who generate a list of anchor based on data send or page rendering

## RoadMap

### goals

- [x] Global : rewrite existing components in composition api for vueJs 3
- [x] Global : use vite config
- [x] Global : rename project with final name "pumpkin"
- [ ] Global : clean project dependencies
- [ ] Global : create a book (based on vite) to display components

- [ ] Pumpkin-tags : Refacto code to make it easier to read and faster
- [ ] Pumpkin-tags : handle hastag with custom colors
- [x] Pumpkin-tags : return hastag search text to parent component
- [x] Pumpkin-tags : update available tag list

- [ ] Pumpkin-intersection : wrapp intersection api 
- [ ] Pumpkin-intersection : Emit function when conditions are reached
- [ ] Pumpkin-intersection : add Debug mode to show percent of osberving element

- [x] Pumpkin-breadcrumb : take an list of object and build a breadcrumb

### bonus

- [ ] create a pure js version to be embeded everywhere
- [ ] Global : implement custom css class
- [ ] Pumpkin-tags : tag list follow caret

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
