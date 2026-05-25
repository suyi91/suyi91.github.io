---
draft: false
date: 2026-05-25
title: Git Notes Guide
description: Git Notes — stick a Post-it on a commit without changing its SHA, but GitHub dropped support in 2014
mermaid: false
mathjax: false
tags: ['Git']
category: ['tech']
translationKey: git-notes
audio: false
---

:::caution[TL;DR]
Git Notes let you attach metadata to commits without affecting their SHA, but **GitHub stopped displaying them in 2014**, making them unsuitable for remote collaboration. Fine for local use; otherwise not recommended.
:::

## What Are Git Notes?

**A Post-it note for Git objects (mostly commits).** You can't change a commit itself (that would alter its SHA), but you can attach extra information alongside it without affecting any commit properties.

By default, notes live under `refs/notes/commits` (the namespace used when running `git notes` without `--ref`). Note that `--ref=commits` is equivalent to `refs/notes/commits` — both write to the same location.

### Key Features

| Feature | Description |
|---------|-------------|
| **SHA-safe** | Notes don't change the commit itself — great for attaching CI results or review comments |
| **Separate storage** | Stored under `refs/notes/commits`, backed by a special tree object |
| **Any object type** | Works on blobs, trees, and tags too, not just commits |
| **Not pushed by default** | Requires explicit push/fetch |
| **Namespaces** | `--ref` isolates notes for different purposes |
| **GitHub unsupported** | GitHub stopped showing notes in 2014 |

## Basic Usage

```bash
# Add a note to the current commit
git notes add -m "Review: LGTM"

# View a note
git notes show HEAD

# Edit an existing note
git notes edit abc123

# Remove a note
git notes remove abc123

# List all commits with notes
git notes list
```

## Live Demo

The following walks through the actual display of notes in `git log`:

```bash
# Add a note to the first commit
git notes add -m "Review: looks good to me" 680457d

# View the log — note appears below the commit message
git log --oneline --notes
# 680457d feat: initial commit
# Notes:
#     Review: looks good to me
```

```bash
# Use namespaces to isolate notes by purpose
git notes --ref=review add -m "Code style: good, no issues" a408136
git notes --ref=ci add -m "Tests: passed (14/14)" a408136
git notes --ref=ci add -m "Build: success (2.3s)" 6fdbc36

# Display specific namespaces with --notes=xxx
git log --oneline --notes=review --notes=ci
# 6fdbc36 chore: add todo comment
# Notes (ci):
#     Build: success (2.3s)
#
# a408136 feat: add index.js
# Notes (review):
#     Code style: good, no issues
#
# Notes (ci):
#     Tests: passed (14/14)
```

```bash
# List all commits with notes (default namespace)
git notes list

# List a specific namespace
git notes --ref=review list
```

```bash
# Append to an existing note — won't overwrite
git notes append -m "Re-review: approved after minor fixes" 680457d

git log --oneline --notes 680457d
# 680457d feat: initial commit
# Notes:
#     Review: looks good to me
#
#     Re-review: approved after minor fixes
```

:::note
`git notes append` is great for incremental additions (e.g., multi-round review comments, CI re-run results). Old and new content are separated by a blank line.
:::

## Namespaces

Different use cases can be isolated into separate namespaces:

```bash
git notes --ref=review add -m "LGTM" HEAD    # → refs/notes/review
git notes --ref=ci add -m "passed" HEAD       # → refs/notes/ci
```

Display them:

```bash
git log --notes=review --notes=ci
```

Or configure `notes.displayRef` to show them automatically.

## Remote Collaboration

### Pushing & Pulling

Notes are not transferred by default — you must explicitly push/fetch them:

```bash
git push origin refs/notes/commits
git fetch origin refs/notes/commits:refs/notes/commits
```

Or configure automatic sync:

```bash
git config remote.origin.fetch "+refs/notes/*:refs/notes/*"
```

### Merge Strategies

When multiple people edit notes simultaneously, conflicts can arise. `git notes merge` supports several strategies:

- `ours` / `theirs` — pick one side and overwrite
- `union` — concatenate both sides
- `cat_sort_uniq` — concatenate, sort, deduplicate (good for line-based formats)
- `manual` (default) — check conflicts into `.git/NOTES_MERGE_WORKTREE`, resolve manually, then `git notes merge --commit`

## Advanced Tips

- **Preserve notes during rebase**: set `notes.rewriteRef` to automatically carry notes through rebase/amend
- **`git log --no-notes`**: hide all notes from the log
- **Use cases**: code review comments, CI test results attached to commits, GPG signature metadata

## Platform Compatibility

GitHub stopped displaying git notes on **August 14, 2014** ([official announcement](https://github.blog/news-insights/git-notes-display/)). Other platforms (GitLab, self-hosted Git services) may also have compatibility issues. **Not recommended in scenarios that rely on remote collaboration.**
