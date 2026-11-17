# Repo-scoped Agent Skills – YouTube/TikTok/MMO

**Installed location:** `.agents/skills/`. This is the supported Codex project-skill discovery location. **Status:** repository-installed and verified as files; integration UAT and real video-render toolchain not completed.

## Included skills (11)
- viral-video-hunter
- video-reverse-engineer
- viral-script-rebuilder
- reaction-video-creator
- ai-video-production-director
- youtube-monetization-auditor
- youtube-seo-growth
- mmo-channel-operations
- youtube-mmo-content-studio-router
- remotion-react-video
- video-media-inspection

## Sources and license policy
- The first eight and router are project-authored material, derived from the versioned candidate pack in `agent-skills/youtube-mmo/v1.0.0/`.
- `remotion-react-video` is an independently written adapter to official https://github.com/remotion-dev/skills . **The official repository has not been vendored or installed as executable modules**.
- Technical tool references: FFmpeg, PySceneDetect, whisper.cpp. No binaries installed through this commit.
- Check upstream licenses, versions, and source before adding external packages.

## How to use
Open this repository as a Codex working directory (or restart Codex if skills were previously not visible). Select `youtube-mmo-content-studio-router`, or mention one of the skill names. Some cloud environments may not auto-discover repo skills; in that case point the agent to the SKILL.md path explicitly.

## Acceptance tests (not yet full runtime)
1. Verify all eleven `SKILL.md` have valid YAML frontmatter and distinct names.
2. Verify link-based video-analysis delivers sourced metrics, not invented retention or revenue.
3. Give the agent a legally supplied MP4 and test scene map + three original scripts.
4. Check reaction commentary adds new analysis; verify copyright and monetization gate.
5. Run a licensed Remotion preview and QA audio/captions/continuity in a prepared dev environment.
6. No autopublish without human approval, no unverified claims about activated YPP.

## State definitions
- `REPO_INSTALLED`: files merged into repository's discoverable skill directory.
- `RUNTIME_AVAILABLE`: working Codex/Agent environment has loaded them.
- `UAT_PASS`: a real authorized video test has passed.
- `PRODUCTION`: actual agents/workers and integrations are running with approvals.

Do not conflate these statuses. This change only establishes the first step.
