# Pumpkin

Simple and easy to use, lib of component for vueJs3 writing with composition API

Goal => no Jquery and smallest number of dependencies possible.

## components

### pumpkin-tags
Small VueJs component "contenteditable div" who can correctly handle hashtag.

the div is editable and detect hashtag, it trigger an event with the hastag text.
You can simply search the word with your own api and change the list of available tags.

### pumpkin-crumbs

A breadCrumb

## RoadMap

### goals

- [x] Global : rewrite existing components in composition api for vueJs 3
- [x] Global : use vite config
- [ ] Global : clean project dependencies
- [ ] Global : create a book to display components
- [ ] Global : implement custom css class
- [ ] Global : rename project with final name "pumpkin"

- [ ] Pumpkin-tags : handle hastag with custom colors
- [ ] Pumpkin-tags : tag list follow caret
- [ ] Pumpkin-tags : return hastag search text to parent component
- [ ] Pumpkin-tags : update available tag list

### bonus

- [ ] create a pure js version to be embeded everywhere

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
