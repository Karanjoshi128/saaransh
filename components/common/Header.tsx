"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [credits, setCredits] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetch("/api/credits")
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.credits === "number") setCredits(data.credits);
        });
    }
  }, [mounted]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary">
                Saaransh
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
              <Link
                href="/pricing"
                className="text-foreground hover:text-primary px-3 py-2 text-sm font-medium"
              >
                Pricing
              </Link>
              <Link href="/upload">
                <Button variant="secondary" className="ml-2">
                  Upload a PDF
                </Button>
              </Link>
            </div>
          </div>

          {/* Theme Toggle */}
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {mounted && (
                <>
                  <Label htmlFor="theme-toggle" className="mr-2">
                    {theme === "dark" ? "Dark" : "Light"} Mode
                  </Label>
                  <Switch
                    id="theme-toggle"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) =>
                      setTheme(checked ? "dark" : "light")
                    }
                  />
                </>
              )}
            </div>

            {/* Desktop auth buttons */}
            <div className="flex items-center gap-2">
              <SignedIn>
                {credits !== null && (
                  <span className="text-xs text-muted-foreground mr-2">
                    Credits: {credits}
                  </span>
                )}
                <UserButton />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="default" className="ml-4">
                    Sign In
                  </Button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Mobile menu button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link href="/upload">
              <Button variant="secondary" className="w-full mt-2">
                Upload a PDF
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
