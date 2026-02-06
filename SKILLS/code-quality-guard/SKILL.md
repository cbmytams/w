# Code Quality Guard Skill

## Description
This skill enforces code quality checks before every commit using **Husky** and **lint-staged**.

## Workflow
1.  When you attempt to `git commit`, Husky triggers the `pre-commit` hook.
2.  `lint-staged` runs checking only the files currently staged for commit.
3.  For JavaScript/TypeScript files, it runs `eslint --fix`.
4.  If errors are found that cannot be auto-fixed, the commit is aborted.

## Configuration
- `.lintstagedrc`: Defines which linters run on which files.
- `.husky/pre-commit`: The shell script that runs `npx lint-staged`.

## Bypass
If you absolutely need to commit without checks (NOT RECOMMENDED), use:
`git commit -m "msg" --no-verify`
