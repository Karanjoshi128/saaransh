import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary/10 via-background to-primary/10 border-t border-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row justify-between items-center gap-8">
        {/* Left: Logo and copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Link href="/" className="text-2xl font-extrabold text-primary tracking-tight hover:scale-105 transition-transform">
            Saaransh
          </Link>
          <span className="text-muted-foreground text-xs sm:ml-3">
            &copy; {new Date().getFullYear()} Saaransh. All rights reserved.
          </span>
        </div>

        {/* Center: Navigation */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/pricing" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
            Pricing
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
            About
          </Link>
          <Link href="/faq" className="text-foreground hover:text-primary text-sm font-medium transition-colors">
            FAQ
          </Link>
        </div>

        {/* Right: Socials or contact */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:support@saaransh.com"
            className="inline-flex items-center gap-1 text-foreground hover:text-primary text-sm transition-colors"
          >
            <svg width="16" height="16" fill="none" className="inline-block" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm0 0l8 8 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Contact
          </a>
          <a
            href="https://github.com/Karanjoshi128/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-foreground hover:text-primary text-sm transition-colors"
          >
            <svg width="16" height="16" fill="none" className="inline-block" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.1-1.48-1.1-1.48-.9-.63.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.7 0 0 .84-.28 2.75 1.05A9.36 9.36 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.4.2 2.44.1 2.7.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.58.69.48C19.13 20.58 22 16.76 22 12.26 22 6.58 17.52 2 12 2z" fill="currentColor"/></svg>
            GitHub
          </a>
        </div>
      </div>
      <div className="w-full border-t border-border pt-4 pb-2 text-center text-xs text-muted-foreground bg-background/80">
        Made with <span className="text-primary">♥</span> by the Saaransh Team
      </div>
    </footer>
  );
};

export default Footer;