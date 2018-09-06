module.exports = {
    "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "settings": {
        "ecmascript": 6,
        "jsx": true
  },
  "parserOptions": {
      "ecmaVersion": 2017,
      "ecmaFeatures": {
          "experimentalObjectRestSpread": true,
          "experimentalDecorators": true,
          "jsx": true
      },
      "sourceType": "module"
  },
  "plugins": [
      "react",
  ],
  "extends": "airbnb",
  "rules":{
    "indent": ["error", "tab"],
    "no-tabs": 0,
    "react/jsx-filename-extension": 0,
    "function-paren-newline": 0,
    "react/jsx-indent": 0,
    "import/extensions": 0,
  },
};