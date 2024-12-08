import { motion } from "framer-motion";

export const HeroScreenshot = () => {
  return (
    <div className="relative">
      {/* Main app window */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-xl border bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center">
            <div className="mx-auto w-80 rounded-full bg-gray-100 px-3 py-1 text-sm">
              shrynk.app
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="grid grid-cols-5 gap-6">
            {/* Drop zone */}
            <div className="col-span-3 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-12">
              <div className="text-center">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <svg
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  <span className="text-sm font-medium text-purple-600">
                    Drop your video here
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-xs text-gray-500">
                    MP4, MOV, MKV up to 2GB
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="col-span-2 space-y-6">
              {/* Quality selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Quality</label>
                <div className="h-10 rounded-lg bg-gray-100" />
              </div>

              {/* Format selector */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Format</label>
                <div className="h-10 rounded-lg bg-gray-100" />
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm font-medium text-gray-700">0%</span>
                </div>
                <div className="h-2 rounded-full bg-gray-100">
                  <div className="h-2 w-0 rounded-full bg-purple-600" />
                </div>
              </div>

              {/* Action button */}
              <button className="w-full rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white">
                Compress Video
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -left-4 -top-4 -z-10 h-72 w-72 rounded-full bg-purple-100 blur-3xl" />
      <div className="absolute -bottom-4 -right-4 -z-10 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />
    </div>
  );
}; 