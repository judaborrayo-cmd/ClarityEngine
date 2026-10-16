# Navigation-only release approval candidate

Approved runtime identity: nav-responsive-abd3624561d2d321.
Baseline:01464ba463545f7efe10d7597be918c93b4cf910.
Branch:feat/navigation-current-site-20261016; worktree:/Users/homefolder/workspaces/ClarityEngine-navigation-current.
Preview:http://127.0.0.1:4316.

Local commit authorized; publication NOT authorized. Four runtime files match reviewed candidate-manifest.json SHA256 values:

| Runtime file | SHA256 |
| --- | --- |
|client/src/components/site-navigation.tsx|7c57ee3554bbcd9d84b14833f8dfb810dccf849f17f35bc21966dd9c90bf726f|
|client/src/components/site-navigation.css|90eaea1519335cd184984c426856a2bea43e3420d126cef99d5193c50e86398e|
|client/src/components/navigation-config.ts|8f564f7b44b34396804e891a12dc2997cc878db416e28a4f362ec268a835bc58|
|client/src/components/legacy-flow-navigation.tsx|effc38a588f3e3dae5f9fdb20264ff9470ecf3742b0676a1a62faf94c00afe0f|

Full navigation900px+, compact through1199 with Start Here, unchanged wide appearance, mobile below900. Names/order/catalog/destinations/availability/icons unchanged. Focused checkout/Assessment header is exact baseline copy. No non-navigation runtime delta, page/media/offer/legal/SEO/Assessment/database/provider changes or branch merges.

Fresh read-only finalization check: remote main still01464ba. Actual public deployment still dpl_8ffW4U8nfJte5UCdTBJmDdN2xxNP with same exact source. Complete12-alias map, project/protection/build settings and six variable metadata match prior safety review. No values read, configuration changed or production application requests made. Default Git hooks directory contains no active non-sample hooks and core.hooksPath is unset; local commit cannot trigger a configured push/deploy/database hook.

Validation reused because exact runtime and browser-test source hashes match:12/12 Chromium tests, TypeScript/build/whitespace PASS. No Assessment/payment/PDF tests repeated. Scope checker now accepts a commit descended from the exact baseline while still comparing the entire delta to that baseline; no scope relaxation. Explicitly selected source/tests/document only; screenshots/logs/manifests/snapshots remain local and uncommitted.

Additional native Safari check (local/services): Solutions, Tools & Kits, Resources opened; Escape dismissed menus; native Page Menu explicitly showed200% after zoom commands; mobile header/dialog and Tools & Kits accordion displayed at that native zoom. The control connection then reported noWindowsAvailable during scrolling. Therefore native Safari scrolling, keyboard focus/trap, explicit900px resize, and complete overflow inspection are NOT TESTED. No claim of full Safari pass, physical-device testing or WebKit-runner coverage (not installed). Zoom was not confirmed restored after control loss; if the local Safari tab persists use View→Actual Size or Cmd0 before normal browsing.

Status: **pending manual browser verification or explicit acceptance of the remaining testing limitation**. No navigation defect found; runtime candidate unchanged. One short manual checklist: in Safari at http://127.0.0.1:4316/services, check all three menus at100%, zoom to200% and scroll the mobile catalog, Tab/Shift-Tab and Escape, resize across900px while a menu is open, confirm no clipping/horizontal scroll or stuck background lock, then restore100%. No form, booking or payment submission.

Previous preservation/safety/refinement documents and full evidence remain in docs/navigation and output/navigation-{safety,review,integration} locally. These historical records are not relabeled as new tests. The legal-route discrepancy predates navigation and remains separate; Assessmentad8c0636, verifier93248de9 and SEO6c1ff050 are not merged or published by this patch.

Next authorization concerns publication of the exact local commit, only after manual verification/acceptance and a brief fresh intervening source/config/domain check. No push, PR, merge, deploy, promote, alias mutation or combined release authorized.
