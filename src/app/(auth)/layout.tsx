import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      {/* Common layout for all auth pages */}
      {children}
    </div>
  );
} 