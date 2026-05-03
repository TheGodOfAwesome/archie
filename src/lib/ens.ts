import { keccak256, toHex, stringToHex, encodeFunctionData, namehash } from 'viem';

export const ensPublicResolverABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "node", "type": "bytes32" },
      { "internalType": "string", "name": "key", "type": "string" },
      { "internalType": "string", "name": "value", "type": "string" }
    ],
    "name": "setText",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export function hashAgentBlueprint(diagram: string, files: any[]): string {
  const content = JSON.stringify({ diagram, files });
  return keccak256(stringToHex(content));
}

export function buildENSSetTextTx(name: string, key: string, value: string) {
  const node = namehash(name);
  return encodeFunctionData({
    abi: ensPublicResolverABI,
    functionName: 'setText',
    args: [node, key, value]
  });
}
