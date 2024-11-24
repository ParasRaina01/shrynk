"use client";
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../lib/utils";

const VideoSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-9 w-full grow overflow-hidden rounded-md">
      <SliderPrimitive.Range className="absolute h-full bg-gray-300/60">
        <svg
          viewBox="0 0 20000 2000"
          xmlns="http://www.w3.org/2000/svg"
          className="z-10 "
        >
          <path
            d="M0 623.644c88.8 185.686 266.4 849.785 444 928.43 177.6 78.645 266.4-343.583 444-535.206 177.6-191.623 266.4-280.184 444-422.909 177.6-142.725 266.4-466.86 444-290.716 177.6 176.144 266.4 978.166 444 1171.435 177.6 193.27 266.4 25.383 444-205.09 177.6-230.474 266.4-999.02 444-947.277 177.6 51.742 266.4 1085.166 444 1205.99 177.6 120.826 266.4-407.18 444-601.863 177.6-194.684 266.4-463.786 444-371.552 177.6 92.233 266.4 681.092 444 832.72 177.6 151.628 266.4-29.084 444-74.581 177.6-45.497 266.4 13.39 444-152.906 177.6-166.295 266.4-610.94 444-678.571 177.6-67.63 266.4 186.368 444 340.42 177.6 154.051 266.4 347.445 444 429.839 177.6 82.394 266.4 181.106 444-17.87 177.6-198.976 266.4-890.33 444-977.01 177.6-86.68 266.4 499.188 444 543.612 177.6 44.425 266.4-228.16 444-321.49 177.6-93.33 266.4-291.338 444-145.159 177.6 146.179 266.4 681.501 444 876.055 177.6 194.554 266.4 36.497 444 96.714 177.6 60.218 266.4 280.584 444 204.374 177.6-76.21 266.4-386.699 444-585.424 177.6-198.725 266.4-272.97 444-408.201 177.6-135.23 266.4-277.26 444-267.953 177.6 9.307 266.4 198.686 444 314.485 177.6 115.8 266.4 225.807 444 264.512 177.6 38.704 266.4-91.79 444-70.991 177.6 20.798 266.4 7.476 444 174.983 177.6 167.507 266.4 707.484 444 662.553 177.6-44.93 266.4-837.27 444-887.206 177.6-49.935 266.4 648.335 444 637.53 177.6-10.803 266.4-678.59 444-691.55 177.6-12.962 266.4 477.315 444 626.745 177.6 149.43 266.4 271.044 444 120.402 177.6-150.643 266.4-869.98 444-873.615 177.6-3.635 266.4 668.903 444 855.436 177.6 186.534 266.4 89.807 444 77.23 177.6-12.577 266.4 4.21 444-140.113 177.6-144.323 266.4-428.388 444-581.501 177.6-153.113 266.4-346.086 444-184.065 177.6 162.02 266.4 817.043 444 994.17 177.6 177.127 355.2-86.828 444-108.536l20 560.076H0Z"
            fill="#6363641a"
          />
          <path
            d="M0 623.644c88.8 185.686 266.4 849.785 444 928.43 177.6 78.645 266.4-343.583 444-535.206 177.6-191.623 266.4-280.184 444-422.909 177.6-142.725 266.4-466.86 444-290.716 177.6 176.144 266.4 978.166 444 1171.435 177.6 193.27 266.4 25.383 444-205.09 177.6-230.474 266.4-999.02 444-947.277 177.6 51.742 266.4 1085.166 444 1205.99 177.6 120.826 266.4-407.18 444-601.863 177.6-194.684 266.4-463.786 444-371.552 177.6 92.233 266.4 681.092 444 832.72 177.6 151.628 266.4-29.084 444-74.581 177.6-45.497 266.4 13.39 444-152.906 177.6-166.295 266.4-610.94 444-678.571 177.6-67.63 266.4 186.368 444 340.42 177.6 154.051 266.4 347.445 444 429.839 177.6 82.394 266.4 181.106 444-17.87 177.6-198.976 266.4-890.33 444-977.01 177.6-86.68 266.4 499.188 444 543.612 177.6 44.425 266.4-228.16 444-321.49 177.6-93.33 266.4-291.338 444-145.159 177.6 146.179 266.4 681.501 444 876.055 177.6 194.554 266.4 36.497 444 96.714 177.6 60.218 266.4 280.584 444 204.374 177.6-76.21 266.4-386.699 444-585.424 177.6-198.725 266.4-272.97 444-408.201 177.6-135.23 266.4-277.26 444-267.953 177.6 9.307 266.4 198.686 444 314.485 177.6 115.8 266.4 225.807 444 264.512 177.6 38.704 266.4-91.79 444-70.991 177.6 20.798 266.4 7.476 444 174.983 177.6 167.507 266.4 707.484 444 662.553 177.6-44.93 266.4-837.27 444-887.206 177.6-49.935 266.4 648.335 444 637.53 177.6-10.803 266.4-678.59 444-691.55 177.6-12.962 266.4 477.315 444 626.745 177.6 149.43 266.4 271.044 444 120.402 177.6-150.643 266.4-869.98 444-873.615 177.6-3.635 266.4 668.903 444 855.436 177.6 186.534 266.4 89.807 444 77.23 177.6-12.577 266.4 4.21 444-140.113 177.6-144.323 266.4-428.388 444-581.501 177.6-153.113 266.4-346.086 444-184.065 177.6 162.02 266.4 817.043 444 994.17 177.6 177.127 355.2-86.828 444-108.536"
            fill="none"
            stroke="#636364"
            strokeWidth={10}
          />
        </svg>
      </SliderPrimitive.Range>
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-9 w-[5px] border border-transparent rounded-l-2xl bg-black transition-colors focus-visible:outline focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
    <SliderPrimitive.Thumb className="block h-9 w-[5px] border border-transparent rounded-r-2xl bg-black transition-colors focus-visible:outline focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 cursor-pointer" />
  </SliderPrimitive.Root>
));

VideoSlider.displayName = SliderPrimitive.Root.displayName;

export { VideoSlider };
