"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react"; // Assuming you have an icon for messages
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-grow h-full flex flex-col pt-24 text-white">
        <div className="p-4">
        <section className="container mx-auto text-center flex flex-col sm:flex-row gap-5 mb-8 md:mb-12">
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl text-black font-bold">
              Dive into the World of Anonymous MESSAGE
            </h1>
            <p className="mt-3 md:mt-4 text-black/45 font-medium md:text-lg">
            ANONMESSAGE - Where your identity remains a secret.
            </p>
          </div>
          <div className="">
            <Image
              className="rounded-xl"
              src="/message.jpeg"
              alt="Message Background"
              width={400}
              height={400}
            />
          </div>
        </section>
        </div>
    

        {/* Carousel for Messages */}
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="">
                <Card className="bg-gray-200 flex flex-col justify-center items-center">
                  <CardHeader>
                    <CardTitle>{message.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0" />
                    <div>
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>

      {/* Footer */}
      <footer className="text-center p-4 md:p-6  text-black">
        © 2024 ANONMESSAGE. All rights reserved.
      </footer>
    </>
  );
}
