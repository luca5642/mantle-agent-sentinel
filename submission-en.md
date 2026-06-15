# DoraHacks Submission Copy

## Project Name

Mantle Agent Sentinel

## Tagline

An AI DevTool that turns agent decisions into verifiable Mantle proof logs.

## Track

AI DevTools

## Short Description

Mantle Agent Sentinel helps builders inspect an AI agent's proposed on-chain action before execution. It produces a safety score, recommendation, evidence list, warning list, proof hash, and Mantle-ready logging payload. The included Solidity contract can record the decision hash and recommendation as an on-chain event, creating a transparent audit trail for autonomous agents.

## Problem

As AI agents begin to operate wallets and DeFi workflows, users need to know why an agent made a decision and whether it checked basic safety constraints before acting. Today, agent decisions are often hidden in prompts, screenshots, or off-chain logs. That makes it hard to compare agents, review failures, or build trusted agent reputation.

## Solution

Mantle Agent Sentinel acts as a lightweight safety and transparency layer. A builder describes an intended on-chain action, selects controls such as dry-run, verified contracts only, and human review, then runs the audit. The tool outputs a structured proof payload with hashes, score, recommendation, evidence, and warnings. `AgentDecisionLog.sol` can record the proof hash, input hash, score, recommendation, and evidence URI on Mantle.

## Mantle Ecosystem Fit

The project supports Mantle's AI x Web3 agent ecosystem by making agent behavior inspectable and benchmarkable. It is especially aligned with the AI DevTools track because it is a Mantle-specific audit assistant for agentic execution, with a path toward on-chain benchmarking and agent reputation.

## Technical Overview

- Static frontend: `index.html`, `styles.css`, `app.js`
- Smart contract: `contracts/AgentDecisionLog.sol`
- Current AI layer: deterministic demo heuristics for fast judging and reproducible output
- On-chain proof design: event logs `agent`, `inputHash`, `proofHash`, `score`, `recommendation`, and `evidenceUri`

## Demo Instructions

1. Open the frontend demo.
2. Describe an AI agent action.
3. Select safety controls.
4. Click "Run agent audit".
5. Copy the generated Mantle logging payload.
6. After deployment, store evidence off-chain and call `recordDecision` on Mantle.

## Links

- GitHub repo: https://github.com/luca5642/mantle-agent-sentinel
- Live demo: https://luca5642.github.io/mantle-agent-sentinel/
- Demo video: live frontend demo available above
- Mantle contract address: not deployed yet; contract source is included at `contracts/AgentDecisionLog.sol`

## Pitch

The Turing Test Hackathon is not only about whether agents can act, but whether their actions can be trusted. Mantle Agent Sentinel gives AI agents a transparent decision layer. Before execution, the agent produces a structured safety decision. After execution, Mantle can store a public record of what was decided and why. This demo is intentionally small, but it shows a clear path toward verifiable agent reputation built from inspectable behavior.
