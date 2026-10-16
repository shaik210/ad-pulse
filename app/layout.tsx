import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://adpulse.app'),
  title: {
    default: 'AdPulse — Local Advertising OS & WhatsApp Lead Pipeline',
    template: '%s | AdPulse',
  },
  description:
    'Launch hyper-local Meta & Google ad campaigns within 5km of your location. Receive customer inquiries directly on WhatsApp and manage follow-ups in a simple local CRM.',
  keywords: [
    'local advertising platform',
    'hyperlocal ads 5km',
    'whatsapp leads',
    'clinic advertising',
    'salon local marketing',
    'dental clinic marketing',
    'quick blast local ads',
    'property rental advertising',
    'google local call ads',
    'instagram reels ads for local business',
    'local customer inquiry crm',
    'flat fee local ads',
  ],
  authors: [{ name: 'AdPulse Technologies' }],
  creator: 'AdPulse',
  publisher: 'AdPulse Technologies',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://adpulse.app',
    siteName: 'AdPulse',
    title: 'AdPulse — Local Advertising OS & WhatsApp Lead Pipeline',
    description:
      'Turn nearby local attention into direct WhatsApp customer inquiries. Targeted 5km ads across Instagram, Facebook & Google Search with zero hidden markups.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AdPulse Local Advertising Platform Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AdPulse — Local Advertising OS & WhatsApp Lead Pipeline',
    description:
      'Launch targeted 5km ads on Meta & Google. Get inquiries straight into your WhatsApp with built-in customer follow-up tracking.',
    images: ['/og-image.png'],
    creator: '@adpulse',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#004526',
  width: 'device-width',
  initialScale: 1,
}

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'SoftwareApplication',
      name: 'AdPulse',
      operatingSystem: 'All Modern Web Browsers (Cloud-Based)',
      applicationCategory: 'BusinessApplication',
      description:
        'Local advertising platform designed for storefronts, clinics, service professionals, and property owners to run 5km radius ads and receive direct WhatsApp customer inquiries.',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: '999',
        highPrice: '4999',
        offerCount: '6',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1240',
      },
    },
    {
      '@type': 'Organization',
      name: 'AdPulse',
      url: 'https://adpulse.app',
      logo: 'https://adpulse.app/icon.svg',
      sameAs: [
        'https://twitter.com/adpulse',
        'https://www.linkedin.com/company/adpulse',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-98765-43210',
        contactType: 'customer support',
        availableLanguage: ['en', 'hi'],
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
