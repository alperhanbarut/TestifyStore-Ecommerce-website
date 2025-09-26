import React from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import { HoverEffect, aboutUsCards } from "@/components/ui/card-hover-effect";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

function AboutUsPage() {
  return (
    <>
      <MacbookScroll
        title={
          <TypewriterEffect
            words={[
              { text: "TestifyStore,", className: "text-base md:text-lg" },
              { text: "modern", className: "text-base md:text-lg" },
              { text: "ve", className: "text-base md:text-lg" },
              { text: "güvenli", className: "text-base md:text-lg" },
              { text: "alışveriş", className: "text-base md:text-lg" },
              { text: "deneyimi", className: "text-base md:text-lg" },
              { text: "sunar.", className: "text-base md:text-lg" },
              { text: "Yenilikçi,", className: "text-base md:text-lg" },
              { text: "hızlı", className: "text-base md:text-lg" },
              { text: "ve", className: "text-base md:text-lg" },
              { text: "kullanıcı", className: "text-base md:text-lg" },
              { text: "odaklı", className: "text-base md:text-lg" },
              { text: "çözümlerle", className: "text-base md:text-lg" },
              { text: "sektörde", className: "text-base md:text-lg" },
              { text: "fark", className: "text-base md:text-lg" },
              { text: "yaratır.", className: "text-base md:text-lg" },
              { text: "Sade,", className: "text-base md:text-lg" },
              { text: "şık", className: "text-base md:text-lg" },
              { text: "ve", className: "text-base md:text-lg" },
              { text: "güvenilir.", className: "text-base md:text-lg" },
            ]}
          />
        }
      />
      <div className="max-w-5xl mx-auto">
        <HoverEffect items={aboutUsCards} />
      </div>
      <div className="my-20 text-center">
        <h2 className="text-3xl font-bold mb-10">Ekibimiz</h2>
        <div className="flex justify-center space-x-6">
          <AnimatedTooltip />
        </div>
      </div>
    </>
  );
}

export default AboutUsPage;
