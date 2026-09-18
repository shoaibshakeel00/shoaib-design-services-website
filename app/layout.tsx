import './globals.css';import type {Metadata} from 'next';import Navbar from '@/components/Navbar';import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';import {ThemeProvider} from '@/components/ThemeProvider';import {siteConfig} from '@/data/siteConfig';
export const metadata:Metadata={title:{default:siteConfig.name,template:`%s | ${siteConfig.name}`},description:siteConfig.description,openGraph:{title:siteConfig.name,description:siteConfig.description,type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" suppressHydrationWarning><body><ThemeProvider><Navbar/>{children}<Footer/><FloatingWhatsApp/></ThemeProvider></body></html>}
