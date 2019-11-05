# Contributing to Tatsy

This repository contains all necessary packages of the **Tatsy** project (excluding plugins that were contributed by 3rd party developers). 

These packages have individual descriptions in their **README** files `(/packages/<package>/README.md)` providing information about their scope and responsibilities. 

Even though the build commands might differ from package to package the way to work with these is the same. This project uses `Lerna` to manage all its subprojects in this monolith repository.

## Our Responsibilities

Project maintainers are responsible for clarifying the standards of acceptable behavior and are expected to take appropriate and fair corrective action in response to any instances of unacceptable behavior.

Project maintainers have the right and responsibility to remove, edit, or reject comments, commits, code, wiki edits, issues, and other contributions that are not aligned to this Code of Conduct, or to ban temporarily or permanently any contributor for other behaviors that they deem inappropriate, threatening, offensive, or harmful.

## Commit Messages Convention

In order to better identify which changes have been made to which package please add the package name in front of every commit, e.g.:

```sh
# e.g. `$ git commit -m "tatsy-logger: some changes"`
git commit -m "<package-name>: some changes"
```

Commits that affect all packages or are not related to any (e.g. changes to NPM scripts or docs) don't need to follow this convention.
