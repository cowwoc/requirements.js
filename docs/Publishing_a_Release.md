# Publishing a Release

```
call pnpm
pnpm run build.debug
cd target
call pnpm config delete @cowwoc:registry
call pnpm publish --access=public
cd ..
```