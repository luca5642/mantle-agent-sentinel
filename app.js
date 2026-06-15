const sampleAction =
  "AI agent plans to call a Mantle lending vault, deposit 1,200 USDC-equivalent into mETH yield exposure, enforce max slippage 0.5%, skip unverified routers, and publish an execution memo for later review.";

const els = {
  track: document.querySelector("#track"),
  actionText: document.querySelector("#actionText"),
  value: document.querySelector("#value"),
  confidence: document.querySelector("#confidence"),
  simulated: document.querySelector("#simulated"),
  verified: document.querySelector("#verified"),
  humanReview: document.querySelector("#humanReview"),
  analyzeButton: document.querySelector("#analyzeButton"),
  sampleButton: document.querySelector("#sampleButton"),
  scoreDial: document.querySelector("#scoreDial"),
  recommendation: document.querySelector("#recommendation"),
  gas: document.querySelector("#gas"),
  hash: document.querySelector("#hash"),
  summary: document.querySelector("#summary"),
  timeline: document.querySelector("#timeline"),
  payload: document.querySelector("#payload"),
  copyButton: document.querySelector("#copyButton")
};

function normalize(text) {
  return text.trim().replace(/\s+/g, " ");
}

function fnv1a(input) {
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return `0x${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function analyze() {
  const action = normalize(els.actionText.value);
  const lower = action.toLowerCase();
  const valueAtRisk = Math.max(0, Number(els.value.value || 0));
  const confidence = Math.min(100, Math.max(1, Number(els.confidence.value || 1)));

  let score = 42;
  const evidence = [];
  const warnings = [];

  if (els.simulated.checked) {
    score += 16;
    evidence.push("Dry-run enabled before any transaction is broadcast.");
  } else {
    warnings.push("No dry-run gate was selected.");
  }

  if (els.verified.checked || lower.includes("verified")) {
    score += 15;
    evidence.push("Verified-contract requirement detected.");
  } else {
    warnings.push("Contract verification is not required.");
  }

  if (lower.includes("slippage") || lower.includes("cap")) {
    score += 10;
    evidence.push("Execution constraints mention slippage or capped risk.");
  } else {
    warnings.push("No explicit slippage or execution bound found.");
  }

  if (lower.includes("memo") || lower.includes("public") || lower.includes("record")) {
    score += 7;
    evidence.push("The agent will publish a reviewable decision trail.");
  }

  if (confidence < 55) {
    score -= 15;
    warnings.push("Agent confidence is low.");
  }

  if (valueAtRisk > 5000) {
    score -= 12;
    warnings.push("Value at risk is high for an autonomous execution.");
  }

  if (els.humanReview.checked) {
    score += 8;
    evidence.push("Human approval is required before execution.");
  }

  score = Math.min(98, Math.max(12, score));

  const recommendation =
    score >= 82 ? "Approve with logging" : score >= 62 ? "Dry-run only" : "Needs review";
  const gasEstimate = 128000 + action.length * 19 + (evidence.length + warnings.length) * 2400;
  const proofHash = fnv1a(`${els.track.value}|${action}|${score}|${Date.now().toString().slice(0, -3)}`);
  const payload = {
    chain: "Mantle Sepolia or Mantle Mainnet",
    contract: "AgentDecisionLog.sol",
    track: els.track.value,
    inputHash: fnv1a(action),
    proofHash,
    score,
    recommendation,
    confidence,
    valueAtRiskUsd: valueAtRisk,
    evidence,
    warnings,
    createdAt: new Date().toISOString()
  };

  els.scoreDial.textContent = String(score);
  els.scoreDial.classList.add("scored");
  els.scoreDial.style.background = `radial-gradient(closest-side, #fff 72%, transparent 73% 100%), conic-gradient(${score >= 62 ? "var(--green)" : "var(--amber)"} ${score * 3.6}deg, #e7eee8 0deg)`;
  els.recommendation.textContent = recommendation;
  els.gas.textContent = gasEstimate.toLocaleString();
  els.hash.textContent = proofHash;
  els.summary.textContent =
    recommendation === "Approve with logging"
      ? "The action is ready for a Mantle proof log. The agent found clear constraints and a reviewable evidence trail."
      : recommendation === "Dry-run only"
        ? "The agent can simulate this action, but execution should wait until the missing controls are added."
        : "The agent should stop and request review before any on-chain execution.";

  const rows = [...evidence, ...warnings].map((item) => `<div><span></span><p>${item}</p></div>`);
  els.timeline.innerHTML = rows.join("");
  els.payload.textContent = JSON.stringify(payload, null, 2);
}

els.analyzeButton.addEventListener("click", analyze);
els.sampleButton.addEventListener("click", () => {
  els.actionText.value = sampleAction;
  els.value.value = 1200;
  els.confidence.value = 86;
  els.simulated.checked = true;
  els.verified.checked = true;
  els.humanReview.checked = false;
  analyze();
});

els.copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(els.payload.textContent);
  els.copyButton.textContent = "Copied";
  window.setTimeout(() => {
    els.copyButton.textContent = "Copy JSON";
  }, 1200);
});

analyze();
