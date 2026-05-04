"use client";

import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { useRouter } from "next/navigation";

const arcL1Network = {
  blockExplorerUrls: ["https://testnet.arcscan.app"],
  chainId: 5042002,
  chainName: "Arc Testnet",
  iconUrls: ["https://app.dynamic.xyz/assets/networks/eth.svg"],
  name: "Arc",
  nativeCurrency: {
    decimals: 18,
    name: "USDC",
    symbol: "USDC",
  },
  networkId: 5042002,
  rpcUrls: ["https://rpc.testnet.arc.network"],
  vanityName: "Arc L1",
};

export default function DynamicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <DynamicContextProvider
      settings={{
        // Use the env var directly or default to the one from .env if not prefixed
        environmentId:
          process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID ||
          "75aac409-f30f-44f7-80c3-1330000b0fbd",
        walletConnectors: [EthereumWalletConnectors],
        overrides: {
          evmNetworks: (networks) => [arcL1Network, ...networks],
        },
        events: {
          onAuthSuccess: () => {
            router.push("/dashboard");
          },
        },
        redirectUrl: "/dashboard",
      }}
    >
      {children}
    </DynamicContextProvider>
  );
}
