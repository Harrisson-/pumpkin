# Pumpkin

Small VueJs component "contenteditable div" who can correctly handle hashtag.

No Jquery and few dependencies.

the div is editable and detect hashtag, it trigger an event with the hastag text.
You can simply search the word with your own api and change the list of available tags.

Goals:
- [ ] rewrite the component in composition api for vueJs 3
- [ ] return hastag search text to parent component
- [ ] update available tag list
- [ ] use vite config

- [ ] clean project dependencies
- [ ] create a pure js version to be embeded everywhere
- [ ] create a book to display component

bonus:
- [ ] handle hastag with custom colors
- [ ] tag list follow caret


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
