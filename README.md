# tags

Small VueJs component "contenteditable div" who can correctly handle hashtag.

No Jquery and few dependencies.

the div is editable and detect hashtag, it trigger an event with the hastag text.
You can simply search the word with your own api and change the list of available tags.

Goals:
[] rewrite the component in composition api for vueJs 3
[] return hastag search text to parent component
[] update available tag list

[] create a pure js version to be embeded everywhere
[] create a book to display component

bonus:
[] handle hastag with custom colors
[] tag list follow caret


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
