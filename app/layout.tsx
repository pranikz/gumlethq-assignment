import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./theme-prodiver";
import { ThemeSwitcher } from "./components";
import { switchThemeDuration } from "./constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Gumlet Assignment",
  description: "Gumlet Assignment",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 dark:bg-[#0d1117] ${switchThemeDuration}`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
