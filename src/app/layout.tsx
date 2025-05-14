import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import { AuthProvider } from '@/features/auth/context/AuthContext';
import { Providers } from './providers';
import './globals.css';

export const metadata: Metadata = {
  title: 'SpeakWise',
  description: 'SpeakWise Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <Providers>
            <AuthProvider>{children}</AuthProvider>
          </Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
} 