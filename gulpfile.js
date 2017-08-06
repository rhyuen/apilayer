"use strict";

const gulp = require("gulp");
const eslint = require("gulp-eslint");


//.eslintrc
//.eslintignore
gulp.task("lint", () => {
  return gulp.src(["**/*.js", "!node_modules/**"])
    .pipe(eslint({
      "rules": {
        "quotes": [1, "double"],
        "semi": [1, "always"]
      },
      "extends": "eslint:recommended",
      "parserOptions": {
        "ecmaVersion": 6
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});
