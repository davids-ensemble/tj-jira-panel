# Changelog

## [2.1.0](https://github.com/davids-ensemble/tj-jira-panel/compare/tj-jira-panel-v2.7.0...tj-jira-panel-v2.1.0) (2025-07-04)


### Features

* :sparkles: added a loading indicator to days when switching between weeks ([19f6d04](https://github.com/davids-ensemble/tj-jira-panel/commit/19f6d04124a1a8337b9f138e03ced2da5c0dee5c))
* :sparkles: added an update banner and button ([#12](https://github.com/davids-ensemble/tj-jira-panel/issues/12)) ([357c569](https://github.com/davids-ensemble/tj-jira-panel/commit/357c56946c0ae2e6fa4f52e584a5d448b4119141))
* ✨ add an edit form for editing existing tasks ([#25](https://github.com/davids-ensemble/tj-jira-panel/issues/25)) ([dc81066](https://github.com/davids-ensemble/tj-jira-panel/commit/dc810667ae31646a46de931fd3723566630e0d47))
* ✨ added a work kind picker ([#26](https://github.com/davids-ensemble/tj-jira-panel/issues/26)) ([0dacb9c](https://github.com/davids-ensemble/tj-jira-panel/commit/0dacb9c9c1f5354a325f43dc5b286169f92ad559))
* added a highlight for the current day ([32e18c6](https://github.com/davids-ensemble/tj-jira-panel/commit/32e18c622a8bd366f7f85b07d2ca2f78ec248937))
* added check for expired session ([62bbfef](https://github.com/davids-ensemble/tj-jira-panel/commit/62bbfefc2aab9ae4c2a5697fbae8d80c444b72ca))
* added server config api ([7919af8](https://github.com/davids-ensemble/tj-jira-panel/commit/7919af8fe0dde818cb8cd5cda854999bdd62c911))
* added task status indicator ([d86ad19](https://github.com/davids-ensemble/tj-jira-panel/commit/d86ad197f4ead3d200cbd2ba50e3a80bcaf764f0))
* added toggling functionality ([a0ab505](https://github.com/davids-ensemble/tj-jira-panel/commit/a0ab5055d8344b165abc2f9a1598b9ad02a12406))
* added widget version to the footer ([3439ac5](https://github.com/davids-ensemble/tj-jira-panel/commit/3439ac58af35bc2b9607d89280a9a325cd2bec45))
* disabled days will be faded out ([0f67dd2](https://github.com/davids-ensemble/tj-jira-panel/commit/0f67dd252f2f6ae8d98671a61f542d480460fe9c))
* **footer:** :sparkles: added a link around the version that redirects to the release notes ([#5](https://github.com/davids-ensemble/tj-jira-panel/issues/5)) ([dc2a8d4](https://github.com/davids-ensemble/tj-jira-panel/commit/dc2a8d4b5513fe5bb9983a75d8ee2284bb749681))
* login functionality ([0ee637a](https://github.com/davids-ensemble/tj-jira-panel/commit/0ee637a2a0cb2358c7e7bbac8cb31bfe832b3b1d))
* **new-task-form:** :sparkles: added a contextual help component to `Parent tasks` to let users know they can edit them ([#8](https://github.com/davids-ensemble/tj-jira-panel/issues/8)) ([6aebc49](https://github.com/davids-ensemble/tj-jira-panel/commit/6aebc495ed917ffe82b6c3c0e83198f5dbfc1aa5))
* **new-task-form:** :sparkles: changed start date's default value to Monday ([b1a9e21](https://github.com/davids-ensemble/tj-jira-panel/commit/b1a9e2133632f64981938f19e314083caf770b88))
* **new-task-form:** ✨ added support for task description pre-filled from Jira ([#18](https://github.com/davids-ensemble/tj-jira-panel/issues/18)) ([d61832e](https://github.com/davids-ensemble/tj-jira-panel/commit/d61832e615f38e2672282256ec2d39f5aa508830))
* parent tasks settings ([6e3686c](https://github.com/davids-ensemble/tj-jira-panel/commit/6e3686cf332419aba8c7520b27c5c619360098f0))
* **script:** :children_crossing: improved page injection to work without requiring a git panel ([2ad82ae](https://github.com/davids-ensemble/tj-jira-panel/commit/2ad82ae17ca3f8331d7ce93c7de4704bcc1ac550))
* **script:** :sparkles: added script version to user scripts ([#14](https://github.com/davids-ensemble/tj-jira-panel/issues/14)) ([c9fd3e2](https://github.com/davids-ensemble/tj-jira-panel/commit/c9fd3e25b5531895ab5d7d651f6a469f7c77b33b))
* **script:** :sparkles: updated user scripts to make the update button work ([#12](https://github.com/davids-ensemble/tj-jira-panel/issues/12)) ([357c569](https://github.com/davids-ensemble/tj-jira-panel/commit/357c56946c0ae2e6fa4f52e584a5d448b4119141))
* task creation form ([b862efd](https://github.com/davids-ensemble/tj-jira-panel/commit/b862efdaa4a768fedddd17643928155b91296c0b))
* task recorded hours ([5ad9a20](https://github.com/davids-ensemble/tj-jira-panel/commit/5ad9a20eaf323498843da38c1dcd315090ec2ac7))
* task's parent will show up if it exists ([971458e](https://github.com/davids-ensemble/tj-jira-panel/commit/971458e85cf25269e0cc61998f49181c2278a8ff))
* **timesheet:** :sparkles: added week navigation allowing the user to view previous weeks ([#11](https://github.com/davids-ensemble/tj-jira-panel/issues/11)) ([82bf941](https://github.com/davids-ensemble/tj-jira-panel/commit/82bf941fd222da7cb72a7b13bece21c93f19e5c8))
* **update-banner:** :sparkles: added a script version check and tooltip to the button ([#14](https://github.com/davids-ensemble/tj-jira-panel/issues/14)) ([c9fd3e2](https://github.com/davids-ensemble/tj-jira-panel/commit/c9fd3e25b5531895ab5d7d651f6a469f7c77b33b))


### Bug Fixes

* :bug: fixed inputs not being updated when moving between weeks ([0c19266](https://github.com/davids-ensemble/tj-jira-panel/commit/0c19266dd355206bfaf08dba4367169dce0f9f2f))
* :bug: removed console.log lines ([#17](https://github.com/davids-ensemble/tj-jira-panel/issues/17)) ([d61832e](https://github.com/davids-ensemble/tj-jira-panel/commit/d61832e615f38e2672282256ec2d39f5aa508830))
* 🐛 fixed localStorage version not updating when component updates automatically ([a00130e](https://github.com/davids-ensemble/tj-jira-panel/commit/a00130efdfe57d641d3df254f270b4e1aaeaeeca))
* fixed a bug that resulted in all subtasks being created as unbillable ([34fb762](https://github.com/davids-ensemble/tj-jira-panel/commit/34fb76248270ba53f8d46ea9f96786f5a6b4e2ec))
* fixed key presses in inputs triggering Jira shortcuts ([9b6edd1](https://github.com/davids-ensemble/tj-jira-panel/commit/9b6edd1a33ff7880b392a51dbc828aed00305a48))
* fixed names containing &lt; or &gt; failing to create tasks ([e459206](https://github.com/davids-ensemble/tj-jira-panel/commit/e459206216b8a1781b95ee8a25f2ebcd1f7108d0))
* **new-task-form:** :bug: fixed the form being locked in loading state after task creation failed ([#10](https://github.com/davids-ensemble/tj-jira-panel/issues/10)) ([472e5af](https://github.com/davids-ensemble/tj-jira-panel/commit/472e5af3235489f613a29fbb8b683c2f6812b464))
* **script:** :bug: fixed undefined variables ([#15](https://github.com/davids-ensemble/tj-jira-panel/issues/15)) ([ae2a670](https://github.com/davids-ensemble/tj-jira-panel/commit/ae2a670d7f28c9926fdde9906876a04c94c5ed90))
* **security:** 🚔 fixed a vulnerability in `cookie` by upgrading `msw` to 2.7.0 ([a209cea](https://github.com/davids-ensemble/tj-jira-panel/commit/a209cea6046a1bf7a5266e63d812397e628d8fd7))
* **security:** 🚔 fixed a vulnerability in `cross-spawn` by upgrading it to 7.0.6 ([a209cea](https://github.com/davids-ensemble/tj-jira-panel/commit/a209cea6046a1bf7a5266e63d812397e628d8fd7))
* **security:** 🚔 fixed a vulnerability in `path-to-regexp` by upgrading `serve` to 14.2.4 ([a209cea](https://github.com/davids-ensemble/tj-jira-panel/commit/a209cea6046a1bf7a5266e63d812397e628d8fd7))
* **timesheet:** :bug: fixed "Previous week" button showing when the task started on Monday ([255e68a](https://github.com/davids-ensemble/tj-jira-panel/commit/255e68a4bcf229832d78f0f05abf0e4e67f7ff30))
* **timesheet:** :bug: fixed previous days not being styled correctly when a new month starts ([a783f1f](https://github.com/davids-ensemble/tj-jira-panel/commit/a783f1fadd6ed6d5e658211ad5193a2f8e1e67ac))


### Miscellaneous Chores

* release 2.0.0 ([5d5267f](https://github.com/davids-ensemble/tj-jira-panel/commit/5d5267f1d932e0927ec4369ecee19c8e8fa4b382))
* release 2.0.0-1 ([fa468b9](https://github.com/davids-ensemble/tj-jira-panel/commit/fa468b993e1cfedfae0a0abf6be0d225d1418e85))
* release 2.1.0 ([a792105](https://github.com/davids-ensemble/tj-jira-panel/commit/a79210505fe2969f5bd9e059a72822f7192fcee6))

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
