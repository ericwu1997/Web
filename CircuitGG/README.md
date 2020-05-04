# CircuitGG
```
¯\_(ツ)_/¯
```
## Getting Started

files in dist (stands for destination) are auto generated
please only modify files in src

all html file are generate from a template called template.html

to use browser react dev tool, run "npm run server"
make sure you run "npm run dev" so save changes to the disk

### Prerequisites

Make sure you have npm and node installed by running (first cloned)
```
npm install
```
### IDE

Visual Studio Code

## Build

### In development mode
include watch mode
```
npm run dev
```
### In production mode

```
npm run prod
```

### In Dev Server mode
*note that this mod does not generate files in dist (or update)
use this mode to track changes and coding simultaneously 
include watch mode
```
npm run server
```

## Optional set up
Hide "node_modules" and ".vscode" (ignore this if is already hidden)
```
view -> Command Palatte -> serch "Open Workspace Setting"
on the right hand side of the panel (where it says Place your setting..)
copy & paste the following
```
```
{
    "files.exclude": {
        "**/.git": true,
        "**/.svn": true,
        "**/.hg": true,
        "**/CVS": true,
        "**/.DS_Store": truem
        "node_modules": true,
        ".vscode": true
    },
}
```
