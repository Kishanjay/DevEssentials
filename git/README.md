## Best practice
 - Keep commit messages consistent - use tools like commitzen (source: https://www.npmjs.com/package/commitizen)


## Submodules
Convenient when working with multiple GIT repo's at the same time -- allows
them to be nested.

### Adding a new Submodule
```sh
git add submodule [GIT URL]]
```

### Remove submodule
```sh
git submodule deinit -f <name>
rm -rf .git/modules/<name>
git rm -f <name>
```

### View Submodules
```sh
git submodule
```
