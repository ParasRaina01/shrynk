import Link from "next/link";
import { ArrowRight, FileVideo, Lock, Zap, Settings, Download, Gauge, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="relative isolate">
        {/* Background gradient */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-emerald-300 to-emerald-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-8 flex justify-center">
              <div className="relative flex items-center gap-x-4 rounded-full px-4 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                {/* <span className="font-semibold text-emerald-600">New Project</span> */}
                {/* <span className="h-4 w-px bg-gray-900/10" aria-hidden="true" /> */}
                <a href="#features" className="flex items-center gap-x-1">
                  <span className="absolute inset-0" aria-hidden="true" />
                  See features
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Compress videos without compromising quality
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Shrynk is a powerful, browser-based video compression tool that processes your videos locally, ensuring complete privacy while delivering exceptional quality.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/video"
                className="rounded-md bg-emerald-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 transition-all duration-200"
              >
                Get started
              </Link>
              <Link 
                href="#features" 
                className="text-sm font-semibold leading-6 text-gray-900 hover:text-emerald-600 transition-colors"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-emerald-600">Everything you need</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              No server uploads, no quality loss
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Shrynk processes everything in your browser, ensuring your videos never leave your device while maintaining the highest possible quality.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    <div className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                      <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Footer */}
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
    </div>
  );
}

const features = [
  {
    name: 'Client-side Processing',
    description:
      'All video compression happens directly in your browser using WebAssembly technology, ensuring fast and efficient processing.',
    icon: Zap,
  },
  {
    name: 'Complete Privacy',
    description:
      'Your videos never leave your device. All processing is done locally, ensuring your content remains private and secure.',
    icon: Lock,
  },
  {
    name: 'Multiple Formats',
    description:
      'Support for various video formats including MP4, MKV, MOV, and AVI. Convert and compress with just a few clicks.',
    icon: FileVideo,
  },
  {
    name: 'Advanced Controls',
    description:
      'Fine-tune your compression with quality controls, trim settings, and audio options for the perfect output.',
    icon: Settings,
  },
  {
    name: 'Lightning Fast',
    description:
      'Optimized encoding presets and efficient processing ensure quick compression without sacrificing quality.',
    icon: Gauge,
  },
  {
    name: 'Easy Download',
    description:
      'Download your compressed videos instantly. No waiting for server processing or upload completion.',
    icon: Download,
  },
];
