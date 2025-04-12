import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kevin - Full Stack Developer Portfolio",
  description: "Full Stack Developer specializing in React, Next.js, and modern web technologies. View my projects, skills, and get in touch for collaboration opportunities.",
  keywords: ["Full Stack Developer", "Web Development", "React", "Next.js", "JavaScript", "TypeScript"],
  authors: [{ name: "Kevin" }],
  openGraph: {
    title: "Kevin - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    url: "https://yourusername.github.io",
    siteName: "Kevin Portfolio",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Kevin - Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kevin - Full Stack Developer Portfolio",
    description: "Full Stack Developer specializing in React, Next.js, and modern web technologies.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://yourusername.github.io" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
              {children}
            </div>
          </div>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `,
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
