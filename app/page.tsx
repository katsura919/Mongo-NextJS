'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function HomePage() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center text-center bg-[#121212]">
      {/* Background Cover Image - Darkened Further */}
      <div className="relative w-full h-[70vh]">
        <Image
          src="/images/cover.jpg"
          alt="Yomikata Cover"
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
      </div>

      {/* Hero + Download Section Positioned Over the Image */}
      <div className="absolute top-[20vh] flex flex-col items-center text-white w-full px-6">
        <h1 className="text-5xl font-extrabold drop-shadow-md">Yomikata</h1>
        <p className="text-lg text-gray-300 mt-3">Discover and Read Manga!</p>

        {/* Download Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-gray-200">Download the App</h2>
          <p className="text-gray-400 mt-2">Available for iOS and Android</p>
          <div className="mt-4 flex space-x-4">
            <Button variant="outline" className="px-6 py-2 border-gray-600 text-gray-300 hover:bg-gray-800">
              Download for iOS
            </Button>
            <Button variant="outline" className="px-6 py-2 border-gray-600 text-gray-300 hover:bg-gray-800">
              Download for Android
            </Button>
          </div>
        </div>
      </div>

      {/* Bigger Carousel Section */}
      <div className="mt-20 w-full max-w-7xl px-8">
        <h2 className="text-3xl font-bold text-white mb-6">App Preview</h2>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
           <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 ">
                <CardContent className="flex aspect-square items-center justify-center p-6 ">
                    <Image
                      src={`/carousel/ui-${index + 1}.png`} 
                      alt={`Preview ${index + 1}`}
                      width={320} 
                      height={400}
                      className="object-contain rounded-1g"
                    />
                </CardContent>
          </CarouselItem>
        ))}
      </CarouselContent>
          <CarouselPrevious className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-300" />
          <CarouselNext className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-300" />
        </Carousel>
      </div>
    </div>
  );
}
