# TODO — Tomorrow (2025-10-03)

This file is an actionable checklist for the next dev session.

1. Push ECR workflow bundle
   - Fetch bundle `feature-adapters-stubs-ecr-fix.bundle` locally and push branch `main-ecr-fix` to `main` or open a PR.
   - Command: `git fetch /path/to/feature-adapters-stub...bundle refs/heads/main:refs/heads/main-ecr-fix && git checkout main-ecr-fix && git push origin main-ecr-fix:main`

2. Monitor Actions runs
   - Watch `ecr-build.yml` and `tests.yml` runs, capture logs and failures.

3. Confirm ECR image pushed
   - Verify with AWS Console or CLI: `aws ecr describe-images --repository-name orca-router --region us-gov-west-1`

4. (Optional) Apply package.json override
   - If peer-deps persist, add `"overrides": { "@opentelemetry/api": "1.4.1" }` and update lockfile.

5. Docker smoke tests
   - Build locally and run health and a mock invoke to validate runtime.

6. Debug dev server
   - Start `npm run dev` in Codespace, capture runtime/plugin errors, fix and verify `/api/health`.

7. Security cleanup
   - Remove any uploaded SSH keys and rotate if necessary.

8. Update PROGRESS.md
   - Record outcomes and next steps.

---

Committed and bundled by automation. Use the provided bundle if pushing from this environment is blocked.
