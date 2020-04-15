# Publishing a Release

```
call yarn
node node_modules\gulp-cli\bin\gulp.js default --mode=DEBUG
cd build
call yarn config delete @cowwoc:registry
call yarn publish --access=public
cd ..
```