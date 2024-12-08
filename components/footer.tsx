import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex flex-col space-y-4 md:order-2">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white">Created by Ashwani Paras</h3>
            <p className="mt-1 text-sm">Full Stack Developer</p>
          </div>
          <div className="flex justify-center space-x-6 md:justify-start">
            <a
              href="https://github.com/ParasRaina01/shrynk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/ashwani-paras"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://twitter.com/parasraina_"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a
              href="mailto:parasraina2021@example.com"
              className="hover:text-white transition-colors"
            >
              <span className="sr-only">Email</span>
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-8">
            <Link href="/video" className="hover:text-white transition-colors">
              Compress Video
            </Link>
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <a 
              href="https://github.com/ParasRaina01/shrynk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Source Code
            </a>
          </div>
          <p className="mt-8 text-sm leading-5">
            &copy; {new Date().getFullYear()} Shrynk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}; 