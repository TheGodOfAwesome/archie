import SplitPane from "@/components/SplitPane";
import AuthWrapper from "@/components/AuthWrapper";

export default function ArchitectApp() {
  return (
    <main className="flex h-screen w-full relative overflow-hidden">
      <AuthWrapper>
        <SplitPane />
      </AuthWrapper>
    </main>
  );
}
