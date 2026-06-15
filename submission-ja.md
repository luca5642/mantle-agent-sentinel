# DoraHacks 応募用テキスト

## Project Name

Mantle Agent Sentinel

## Tagline

AIエージェントのオンチェーン判断を、Mantle上で検証可能な証跡にするDevTool。

## Track

AI DevTools

## Short Description

Mantle Agent Sentinelは、AIエージェントが実行しようとしているオンチェーン操作を事前監査し、安全スコア、推奨判断、証跡JSON、Mantle記録用のハッシュを生成する軽量DevToolです。Solidityコントラクトは判断ログをイベントとして記録でき、AIエージェントの透明性と説明責任を高めます。

## Problem

AIエージェントがウォレットやDeFi操作を実行する時、なぜその判断をしたのか、どの制約を確認したのか、あとから検証しづらい問題があります。特に自律実行では、dry-run、コントラクト検証、slippage制約、リスク上限などの確認が抜けると危険です。

## Solution

このデモは、ユーザーが入力したオンチェーン操作をAI監査エージェント風にスコアリングし、Mantleに保存できる判断証跡を生成します。生成されるペイロードには、入力ハッシュ、proof hash、安全スコア、推奨判断、検出した根拠、警告が含まれます。付属の `AgentDecisionLog.sol` により、Mantle上でその判断を記録できます。

## Mantle Ecosystem Fit

MantleのAI x Web3エージェント開発において、実行前の透明な安全レイヤーとして使えます。AI DevToolsトラックの「Mantle-specific audit assistants」「smart gas optimisation tools」に近く、将来的にはMantle Sepoliaにコントラクトをデプロイし、各エージェント判断をオンチェーンで比較可能にできます。

## Technical Overview

- Static frontend: `index.html`, `styles.css`, `app.js`
- Smart contract: `contracts/AgentDecisionLog.sol`
- AI logic: current demo uses deterministic scoring heuristics for fast judging/demo
- On-chain proof design: event logs `agent`, `inputHash`, `proofHash`, `score`, `recommendation`, `evidenceUri`

## Demo Instructions

1. Open the frontend demo.
2. Describe an AI agent action.
3. Select safety controls.
4. Click “Run agent audit”.
5. Copy the generated Mantle logging payload.
6. Use the payload hash with `AgentDecisionLog.recordDecision` after deployment.

## Links

- GitHub repo: TODO
- Live demo: TODO
- Demo video: TODO
- Mantle contract address: TBD

## Pitch

The Turing Test Hackathon asks not only whether agents can act, but whether their actions can be verified. Mantle Agent Sentinel gives AI agents a transparent decision layer: before execution, the agent produces a safety score and proof payload; after execution, Mantle stores a public record of what was decided and why. It is intentionally simple, but it points toward a future where agent reputation is based on inspectable behavior, not screenshots or trust.
