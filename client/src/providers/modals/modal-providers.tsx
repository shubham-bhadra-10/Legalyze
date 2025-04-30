import { ConnectAccountModal } from '@/components/models/connect-account-modal';

export function ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <ConnectAccountModal />
    </>
  );
}
