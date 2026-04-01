# Changelog

## [2.10.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.9.0...v2.10.0) (2026-04-01)


### Features

* ✨ unsubmitted timesheet banner ([#36](https://github.com/davids-ensemble/tj-jira-panel/issues/36)) ([3655f26](https://github.com/davids-ensemble/tj-jira-panel/commit/3655f265939b5ab02a5b1659f3f57aee48066df0))


### Bug Fixes

* **scripts:** 🐛 fixed unreliable version handling ([#43](https://github.com/davids-ensemble/tj-jira-panel/issues/43)) ([8c27292](https://github.com/davids-ensemble/tj-jira-panel/commit/8c27292272723d8d7cffb3c8407d88c765eda9e3))
* **security:** 🚔 fixed vulnerabilities ([#45](https://github.com/davids-ensemble/tj-jira-panel/issues/45)) ([1c6843a](https://github.com/davids-ensemble/tj-jira-panel/commit/1c6843a0ba79d2d71ebdfa63dd0db6caf52c6600))

## [2.9.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.8.0...v2.9.0) (2025-11-13)


### Features

* ✨ added custom theme for Jira Cloud ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))
* ✨ added TJ's country in the footer (RO, UK or NA) ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))
* ✨ changed update banner to handle beta versions ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))
* ✨ remember if user collapsed panel and restore TJI in that state ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))
* **script:** 🚸 added a beta version user-script ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))
* **script:** 🚸 added support for Jira Cloud ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))


### Bug Fixes

* 🐛 fixed emojis preventing task creation/update (closes [#34](https://github.com/davids-ensemble/tj-jira-panel/issues/34)) ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))
* 🐛 fixed empty Jira description passing `undefined` to textbox ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))
* 🐛 fixed incorrect release notes link in update banner ([24f03d5](https://github.com/davids-ensemble/tj-jira-panel/commit/24f03d5dc3aa714c7aed82da60b1e787de23e4da))

## [2.8.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.7.0...v2.8.0) (2025-07-04)


### Features

* ✨ added a work kind picker ([#26](https://github.com/davids-ensemble/tj-jira-panel/issues/26)) ([0dacb9c](https://github.com/davids-ensemble/tj-jira-panel/commit/0dacb9c9c1f5354a325f43dc5b286169f92ad559))

## [2.7.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.6.0...v2.7.0) (2025-02-20)


### Features

* ✨ add an edit form for editing existing tasks ([#25](https://github.com/davids-ensemble/tj-jira-panel/issues/25)) ([dc81066](https://github.com/davids-ensemble/tj-jira-panel/commit/dc810667ae31646a46de931fd3723566630e0d47))


### Bug Fixes

* **security:** 🚔 fixed a vulnerability in `cookie` by upgrading `msw` to 2.7.0 ([a209cea](https://github.com/davids-ensemble/tj-jira-panel/commit/a209cea6046a1bf7a5266e63d812397e628d8fd7))
* **security:** 🚔 fixed a vulnerability in `cross-spawn` by upgrading it to 7.0.6 ([a209cea](https://github.com/davids-ensemble/tj-jira-panel/commit/a209cea6046a1bf7a5266e63d812397e628d8fd7))
* **security:** 🚔 fixed a vulnerability in `path-to-regexp` by upgrading `serve` to 14.2.4 ([a209cea](https://github.com/davids-ensemble/tj-jira-panel/commit/a209cea6046a1bf7a5266e63d812397e628d8fd7))

## [2.6.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.5.0...v2.6.0) (2024-10-25)


### Features

* **new-task-form:** :sparkles: changed start date's default value to Monday ([b1a9e21](https://github.com/davids-ensemble/tj-jira-panel/commit/b1a9e2133632f64981938f19e314083caf770b88))


### Bug Fixes

* **timesheet:** :bug: fixed "Previous week" button showing when the task started on Monday ([255e68a](https://github.com/davids-ensemble/tj-jira-panel/commit/255e68a4bcf229832d78f0f05abf0e4e67f7ff30))
* **timesheet:** :bug: fixed previous days not being styled correctly when a new month starts ([a783f1f](https://github.com/davids-ensemble/tj-jira-panel/commit/a783f1fadd6ed6d5e658211ad5193a2f8e1e67ac))

## [2.5.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.4.1...v2.5.0) (2024-10-10)


### Features

* :sparkles: added a loading indicator to days when switching between weeks ([19f6d04](https://github.com/davids-ensemble/tj-jira-panel/commit/19f6d04124a1a8337b9f138e03ced2da5c0dee5c))
* **script:** :children_crossing: improved page injection to work without requiring a git panel ([2ad82ae](https://github.com/davids-ensemble/tj-jira-panel/commit/2ad82ae17ca3f8331d7ce93c7de4704bcc1ac550))


### Bug Fixes

* :bug: fixed inputs not being updated when moving between weeks ([0c19266](https://github.com/davids-ensemble/tj-jira-panel/commit/0c19266dd355206bfaf08dba4367169dce0f9f2f))

## [2.4.1](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.4.0...v2.4.1) (2024-05-28)


### Bug Fixes

* 🐛 fixed localStorage version not updating when component updates automatically ([a00130e](https://github.com/davids-ensemble/tj-jira-panel/commit/a00130efdfe57d641d3df254f270b4e1aaeaeeca))

## [2.4.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.3.0...v2.4.0) (2024-05-27)


### Features

* **new-task-form:** ✨ added support for task description pre-filled from Jira ([#18](https://github.com/davids-ensemble/tj-jira-panel/issues/18)) ([d61832e](https://github.com/davids-ensemble/tj-jira-panel/commit/d61832e615f38e2672282256ec2d39f5aa508830))


### Bug Fixes

* :bug: removed console.log lines ([#17](https://github.com/davids-ensemble/tj-jira-panel/issues/17)) ([d61832e](https://github.com/davids-ensemble/tj-jira-panel/commit/d61832e615f38e2672282256ec2d39f5aa508830))

## [2.3.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.2.0...v2.3.0) (2024-05-18)


### Features

* :sparkles: added an update banner and button ([#12](https://github.com/davids-ensemble/tj-jira-panel/issues/12)) ([357c569](https://github.com/davids-ensemble/tj-jira-panel/commit/357c56946c0ae2e6fa4f52e584a5d448b4119141))
* **script:** :sparkles: added script version to user scripts ([#14](https://github.com/davids-ensemble/tj-jira-panel/issues/14)) ([c9fd3e2](https://github.com/davids-ensemble/tj-jira-panel/commit/c9fd3e25b5531895ab5d7d651f6a469f7c77b33b))
* **script:** :sparkles: updated user scripts to make the update button work ([#12](https://github.com/davids-ensemble/tj-jira-panel/issues/12)) ([357c569](https://github.com/davids-ensemble/tj-jira-panel/commit/357c56946c0ae2e6fa4f52e584a5d448b4119141))
* **update-banner:** :sparkles: added a script version check and tooltip to the button ([#14](https://github.com/davids-ensemble/tj-jira-panel/issues/14)) ([c9fd3e2](https://github.com/davids-ensemble/tj-jira-panel/commit/c9fd3e25b5531895ab5d7d651f6a469f7c77b33b))


### Bug Fixes

* **script:** :bug: fixed undefined variables ([#15](https://github.com/davids-ensemble/tj-jira-panel/issues/15)) ([ae2a670](https://github.com/davids-ensemble/tj-jira-panel/commit/ae2a670d7f28c9926fdde9906876a04c94c5ed90))

## [2.2.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.1.0...v2.2.0) (2024-05-11)


### Features

* **new-task-form:** :sparkles: added a contextual help component to `Parent tasks` to let users know they can edit them ([#8](https://github.com/davids-ensemble/tj-jira-panel/issues/8)) ([6aebc49](https://github.com/davids-ensemble/tj-jira-panel/commit/6aebc495ed917ffe82b6c3c0e83198f5dbfc1aa5))
* **timesheet:** :sparkles: added week navigation allowing the user to view previous weeks ([#11](https://github.com/davids-ensemble/tj-jira-panel/issues/11)) ([82bf941](https://github.com/davids-ensemble/tj-jira-panel/commit/82bf941fd222da7cb72a7b13bece21c93f19e5c8))


### Bug Fixes

* **new-task-form:** :bug: fixed the form being locked in loading state after task creation failed ([#10](https://github.com/davids-ensemble/tj-jira-panel/issues/10)) ([472e5af](https://github.com/davids-ensemble/tj-jira-panel/commit/472e5af3235489f613a29fbb8b683c2f6812b464))

## [2.1.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.0.0-1...v2.1.0) (2024-04-06)


### Features

* **footer:** :sparkles: added a link around the version that redirects to the release notes ([#5](https://github.com/davids-ensemble/tj-jira-panel/issues/5)) ([dc2a8d4](https://github.com/davids-ensemble/tj-jira-panel/commit/dc2a8d4b5513fe5bb9983a75d8ee2284bb749681))


### Miscellaneous Chores

* release 2.1.0 ([a792105](https://github.com/davids-ensemble/tj-jira-panel/commit/a79210505fe2969f5bd9e059a72822f7192fcee6))

## [2.0.0-1](https://github.com/davids-ensemble/tj-jira-panel/compare/v2.0.0...v2.0.0-1) (2024-04-05)


### Miscellaneous Chores

* release 2.0.0-1 ([fa468b9](https://github.com/davids-ensemble/tj-jira-panel/commit/fa468b993e1cfedfae0a0abf6be0d225d1418e85))

## [2.0.0](https://github.com/davids-ensemble/tj-jira-panel/compare/v1.2.0...v2.0.0) (2024-04-05)


### Miscellaneous Chores

* release 2.0.0 ([5d5267f](https://github.com/davids-ensemble/tj-jira-panel/commit/5d5267f1d932e0927ec4369ecee19c8e8fa4b382))
