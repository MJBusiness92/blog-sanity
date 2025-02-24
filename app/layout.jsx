import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Corrigir o caminho de importação    
import Navbar from '../components/Navbar'; // Corrigir o caminho de importação
import Footer from '../components/Footer'; // Corrigir o caminho de importação

export const metadata = {
  verification: {
    google: 'J2lf4PqA7U2aj3L50gVc9BXfxzYVcBamX-B-wirdU-8',
  },
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
