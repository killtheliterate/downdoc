# downdoc
> Simple JavaScript markdown documentation generator.

## How does it work?

Looks for ES2015 named exports and their leading comments and creates markdown
files that mirror the folder structure of the one supplied.

## Install

```shell
npm i downdoc
```

## Usage

```shell
downdoc src/js docs
```

## Pluggable

Create a module that exports a single function that takes

```
{
  path :: String,
  content :: String,
  ast :: ASTObject
}
```
where
  - `path` is the path of the JS file relative to the project root
  - `content` is the... content
  - `ast` is an abstract syntax tree object of the JS file

and returns 

```
{
  path :: String,
  content :: String
}
```

where 
  - the `path` is relative to the project directory and includes the
    filename + extension
  - `content` is the documentation of the file

Then use it like

```shell
downdoc --plugin path/to/my/plugin.js src docs
# or
downdoc -p name-of-installed-npm-package src docs
```

## API Docs

`downdoc` creates it's own [docs](/docs)

## Bugs?

[Tell me about them.](https://github.com/LegitTalon/downdoc/issues/new)
