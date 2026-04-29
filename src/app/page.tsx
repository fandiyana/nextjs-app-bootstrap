import Invitation from "@/components/Invitation";

export default function Page() {
  // Recipient name can be passed via ?to= query string in the future.
  return (
    <main className="phone-frame">
      <Invitation />
    </main>
  );
}
