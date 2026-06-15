# Mantle Agent Sentinel

Mantle Agent Sentinel is a small AI DevTool demo for The Turing Test Hackathon 2026.

It reviews an AI agent's proposed on-chain action, scores the safety of that action, and creates a Mantle-ready decision proof payload. The included Solidity contract records the agent's decision hash, proof hash, score, recommendation, and evidence URI as an on-chain event.

Live demo: https://luca5642.github.io/mantle-agent-sentinel/

## Track

Primary track: AI DevTools

Optional secondary track: Agentic Wallets & Economy

## Why this fits Mantle

- AI x on-chain integration: converts an AI decision into an event that can be logged on Mantle.
- Technical depth: separates agent analysis, user-facing review, and on-chain proof logging.
- Ecosystem contribution: gives Mantle agent builders a transparent safety layer before autonomous execution.
- Product completeness: static runnable frontend plus a minimal Solidity contract.

## Run the demo

Open `index.html` in a browser, or serve this folder with the included static server.

```bash
node server.js
```

Then visit:

```text
http://localhost:8787
```

## Contract

`contracts/AgentDecisionLog.sol` is Mantle-compatible Solidity.

Suggested deployment target:

- Mantle Sepolia Testnet
- Contract address: TBD

After deployment, update this README and the DoraHacks submission with the deployed address and explorer link.

## Demo flow

1. Describe an AI agent action.
2. Choose risk controls such as dry-run, verified contracts, and human review.
3. Run the agent audit.
4. Copy the generated JSON proof.
5. Store the proof in IPFS/GitHub gist and call `recordDecision` with the proof hash and evidence URI.

## Next steps

- Connect a wallet with `ethers.js`.
- Write the generated payload to IPFS.
- Call `AgentDecisionLog.recordDecision` on Mantle Sepolia.
- Add a real LLM backend for policy checks and richer explanations.
