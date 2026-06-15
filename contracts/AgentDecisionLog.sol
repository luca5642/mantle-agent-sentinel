// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title AgentDecisionLog
/// @notice Minimal Mantle-compatible event log for AI agent decisions.
contract AgentDecisionLog {
    event DecisionRecorded(
        address indexed agent,
        bytes32 indexed inputHash,
        bytes32 indexed proofHash,
        uint8 score,
        string recommendation,
        string evidenceUri
    );

    struct Decision {
        address agent;
        bytes32 inputHash;
        bytes32 proofHash;
        uint8 score;
        string recommendation;
        string evidenceUri;
        uint256 createdAt;
    }

    Decision[] private decisions;

    function recordDecision(
        bytes32 inputHash,
        bytes32 proofHash,
        uint8 score,
        string calldata recommendation,
        string calldata evidenceUri
    ) external returns (uint256 decisionId) {
        require(score <= 100, "score too high");
        require(bytes(recommendation).length > 0, "missing recommendation");

        decisions.push(
            Decision({
                agent: msg.sender,
                inputHash: inputHash,
                proofHash: proofHash,
                score: score,
                recommendation: recommendation,
                evidenceUri: evidenceUri,
                createdAt: block.timestamp
            })
        );

        decisionId = decisions.length - 1;
        emit DecisionRecorded(msg.sender, inputHash, proofHash, score, recommendation, evidenceUri);
    }

    function decisionCount() external view returns (uint256) {
        return decisions.length;
    }

    function getDecision(uint256 decisionId) external view returns (Decision memory) {
        require(decisionId < decisions.length, "decision not found");
        return decisions[decisionId];
    }
}
