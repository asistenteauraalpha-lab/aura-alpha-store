export const metadata = {
  title: 'Aura Alpha Store',
  description: 'Tienda de tecnología premium',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {children}
      </body>
    </html>
  )
}
