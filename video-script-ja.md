# 2分デモ動画スクリプト

0:00 - 0:15
「これは Mantle Agent Sentinel です。AIエージェントのオンチェーン判断を、実行前に監査して、Mantleに記録できる証跡へ変換するDevToolです。」

0:15 - 0:40
「左側に、エージェントがやろうとしている操作を書きます。今回は mETH へのリバランス、slippage制限、verified contracts only、公開メモを含む操作です。」

0:40 - 1:05
「Run agent audit を押すと、dry-runの有無、コントラクト検証、slippage制約、value at risk、agent confidence を見て、安全スコアと推奨判断を出します。」

1:05 - 1:30
「右下には Mantle logging payload が生成されます。これは入力ハッシュ、proof hash、score、recommendation、evidence、warningsを含みます。」

1:30 - 1:50
「付属の Solidity コントラクト `AgentDecisionLog.sol` により、この判断をMantle上のイベントとして保存できます。これにより、AIエージェントの判断履歴をあとから検証可能にできます。」

1:50 - 2:00
「今後はウォレット接続、IPFS保存、Mantle Sepoliaへのデプロイ、LLMバックエンドを追加して、実際のAgentic Walletの安全レイヤーにします。」
