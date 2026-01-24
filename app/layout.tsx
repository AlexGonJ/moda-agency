import Providers from './providers'
import './globals.scss'
import CustomCursor from '../components/CustomCursor'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CustomCursor/>
          {children}
        </Providers>
      </body>
    </html>
  )
}
