import { Inter } from 'next/font/google';
import '../styles/globals.css'; // Corrigir o caminho de importação    
import Navbar from '../components/Navbar'; // Corrigir o caminho de importação
import Footer from '../components/Footer'; // Corrigir o caminho de importação

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
