
**Markers** provides simple means to quickly jump to special comments called markers.

Nova will recognize comments formatted a certain way as “bookmarks” in supported programming languages. Generally, the format is a comment with a leading exclamation point.

```js
//! Im a bookmark
/* ! Im also a bookmark */
```

Markers extends this notion by supporting more formats.

XCode style markers `MARK`, `TODO`, `FIXME`.

```js
//MARK: Initialize the API
//TODO: Refactor API
//FIXME: This input must be sanitized...
```

Also the old Objective C style is also supported.

```c
#pragma mark - Do This
```

# Configuration

Markers are defined by simple regular expressions. You can add your own regular expressions or modify them to your liking.

The regular expression is entered without the `/` or modifiers and remember to escape slashes when entering a regular expression.

## Requirements

This extension does have any external dependancies or uses additional executables.

## Usage

To run Markers:

- Open the command palette and type `Marker`

