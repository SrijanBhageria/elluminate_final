import type { Metadata } from 'next';
import { 
  Inter, 
  Roboto, 
  Open_Sans, 
  Lato, 
  Montserrat, 
  Nunito, 
  Poppins, 
  Raleway,
  Playfair_Display,
  Merriweather,
  Crimson_Text,
  Libre_Baskerville,
  Source_Serif_4,
  JetBrains_Mono,
  Fira_Code,
  Space_Mono,
  Ubuntu_Mono,
  Work_Sans,
  DM_Sans,
  Manrope,
  Outfit,
  Plus_Jakarta_Sans,
  Figtree,
  Geist,
  Epilogue,
  Lexend,
  Readex_Pro,
  IBM_Plex_Sans,
  Source_Sans_3,
  Noto_Sans,
  Rubik,
  Quicksand,
  Mulish,
  Karla,
  Tajawal,
  Cormorant_Garamond,
  Libre_Caslon_Display,
  Baskervville,
  Crimson_Pro,
  Lora,
  Vollkorn,
  Alegreya,
  Domine,
  Spectral,
  PT_Serif,
  Source_Code_Pro,
  Roboto_Mono,
  Inconsolata,
  Courier_Prime
} from 'next/font/google';
import { ThemeProvider } from '@/contexts/ThemeContext';
import SmoothScrollProvider from '@/components/SmoothScrollProvider';
import ConditionalNavbar from '@/components/ConditionalNavbar';
import MicrosoftClarity from '@/components/MicrosoftClarity';
import './globals.css';

// Sans-serif fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-lato',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
});

// Serif fonts
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display',
  display: 'swap',
});

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-crimson-text',
  display: 'swap',
});

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-libre-baskerville',
  display: 'swap',
});

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif-4',
  display: 'swap',
});

// Monospace fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
  display: 'swap',
});

const ubuntuMono = Ubuntu_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ubuntu-mono',
  display: 'swap',
});

// Professional Marketing Sans-serif Fonts
const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const figtree = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap',
});

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

const readexPro = Readex_Pro({
  subsets: ['latin'],
  variable: '--font-readex-pro',
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-ibm-plex-sans',
  display: 'swap',
});

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  variable: '--font-source-sans-3',
  display: 'swap',
});

const notoSans = Noto_Sans({
  subsets: ['latin'],
  variable: '--font-noto-sans',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});

const quicksand = Quicksand({
  subsets: ['latin'],
  variable: '--font-quicksand',
  display: 'swap',
});

const mulish = Mulish({
  subsets: ['latin'],
  variable: '--font-mulish',
  display: 'swap',
});

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap',
});

const tajawal = Tajawal({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-tajawal',
  display: 'swap',
});

// Professional Marketing Serif Fonts
const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
  display: 'swap',
});

const libreCaslonDisplay = Libre_Caslon_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-libre-caslon-display',
  display: 'swap',
});

const baskervville = Baskervville({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-baskervville',
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  subsets: ['latin'],
  variable: '--font-crimson-pro',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-lora',
  display: 'swap',
});

const vollkorn = Vollkorn({
  subsets: ['latin'],
  variable: '--font-vollkorn',
  display: 'swap',
});

const alegreya = Alegreya({
  subsets: ['latin'],
  variable: '--font-alegreya',
  display: 'swap',
});

const domine = Domine({
  subsets: ['latin'],
  variable: '--font-domine',
  display: 'swap',
});

const spectral = Spectral({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-spectral',
  display: 'swap',
});

const ptSerif = PT_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-pt-serif',
  display: 'swap',
});

// Additional Monospace Fonts
const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  variable: '--font-source-code-pro',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

const inconsolata = Inconsolata({
  subsets: ['latin'],
  variable: '--font-inconsolata',
  display: 'swap',
});

const courierPrime = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-courier-prime',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Elluminate Capital',
  description: 'Professional Investment Banking Services',
  keywords: 'investment banking, financial services, capital markets, advisory',
  authors: [{ name: 'Elluminate Capital' }],
  robots: 'index, follow',
  icons: {
    icon: '/icon.png',
  },
  openGraph: {
    title: 'Elluminate Capital',
    description: 'Professional Investment Banking Services',
    type: 'website',
    locale: 'en_US',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Cascadia Code loaded via link so Next.js does not warn about missing font metrics */}
        <link
          href="https://fonts.googleapis.com/css2?family=Cascadia+Code:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`
          ${inter.variable} 
          ${roboto.variable} 
          ${openSans.variable} 
          ${lato.variable} 
          ${montserrat.variable} 
          ${nunito.variable} 
          ${poppins.variable} 
          ${raleway.variable}
          ${playfairDisplay.variable}
          ${merriweather.variable}
          ${crimsonText.variable}
          ${libreBaskerville.variable}
          ${sourceSerif.variable}
          ${jetbrainsMono.variable}
          ${firaCode.variable}
          ${spaceMono.variable}
          ${ubuntuMono.variable}
          ${workSans.variable}
          ${dmSans.variable}
          ${manrope.variable}
          ${outfit.variable}
          ${plusJakartaSans.variable}
          ${figtree.variable}
          ${geistSans.variable}
          ${epilogue.variable}
          ${lexend.variable}
          ${readexPro.variable}
          ${ibmPlexSans.variable}
          ${sourceSans3.variable}
          ${notoSans.variable}
          ${rubik.variable}
          ${quicksand.variable}
          ${mulish.variable}
          ${karla.variable}
          ${tajawal.variable}
          ${cormorantGaramond.variable}
          ${libreCaslonDisplay.variable}
          ${baskervville.variable}
          ${crimsonPro.variable}
          ${lora.variable}
          ${vollkorn.variable}
          ${alegreya.variable}
          ${domine.variable}
          ${spectral.variable}
          ${ptSerif.variable}
          ${sourceCodePro.variable}
          ${robotoMono.variable}
          ${inconsolata.variable}
          ${courierPrime.variable}
        `}
        style={{
          fontFamily: 'var(--font-family-primary)',
        }}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <SmoothScrollProvider>
            <div
              style={{
                minHeight: '100vh',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                transition: 'background-color var(--transition-normal), color var(--transition-normal)',
              }}
            >
              {/* Navigation */}
              <ConditionalNavbar />
              
              {/* Main Content */}
              <main>{children}</main>
              
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>

        {/* Analytics */}
        <MicrosoftClarity />
      </body>
    </html>
  );
}