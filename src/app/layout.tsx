import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ApolloWrapper } from './ApolloWrapper';
import { ThemeRegistry } from './ThemeRegistry';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rick and Morty Character Search',
  description: 'Autocomplete search for Rick and Morty characters',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <ThemeRegistry>{children}</ThemeRegistry>
        </ApolloWrapper>
      </body>
    </html>
  );
}
