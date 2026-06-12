import { useEffect, useRef, useState, type CSSProperties, type ElementType } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

type SplitTextInstance = {
  revert: () => void;
};

type SplitSelf = {
  chars: Element[];
  words: Element[];
  lines: Element[];
};

type SplitTextElement = HTMLElement & {
  _rbsplitInstance?: SplitTextInstance | null;
};

type SplitTextProps = {
  tag?: ElementType;
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
};

function SplitText({
  text,
  className = "",
  delay = 50,
  duration = 1.25,
  ease = "power3.out",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  tag = "p",
  onLetterAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<SplitTextElement | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (!document.fonts || document.fonts.status === "loaded") {
      setFontsLoaded(true);
      return;
    }

    document.fonts.ready.then(() => {
      setFontsLoaded(true);
    });
  }, []);

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded) return;
      if (animationCompletedRef.current) return;

      const el = ref.current;

      if (el._rbsplitInstance) {
        el._rbsplitInstance.revert();
        el._rbsplitInstance = null;
      }

      const startPct = (1 - threshold) * 100;
      const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
      const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
      const marginUnit = marginMatch ? marginMatch[2] || "px" : "px";
      const sign =
        marginValue === 0
          ? ""
          : marginValue < 0
            ? `-=${Math.abs(marginValue)}${marginUnit}`
            : `+=${marginValue}${marginUnit}`;
      const start = `top ${startPct}%${sign}`;

      let targets: Element[] = [];
      const assignTargets = (self: SplitSelf) => {
        if (splitType.includes("chars") && self.chars.length) targets = self.chars;
        if (!targets.length && splitType.includes("words") && self.words.length) {
          targets = self.words;
        }
        if (!targets.length && splitType.includes("lines") && self.lines.length) {
          targets = self.lines;
        }
        if (!targets.length) targets = self.chars || self.words || self.lines;
      };

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        smartWrap: true,
        autoSplit: splitType === "lines",
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: false,
        onSplit: (self: SplitSelf) => {
          assignTargets(self);
          return gsap.fromTo(targets, { ...from }, {
            ...to,
            duration,
            ease,
            force3D: true,
            scrollTrigger: {
              anticipatePin: 0.4,
              fastScrollEnd: true,
              once: true,
              start,
              trigger: el,
            },
            stagger: delay / 1000,
            willChange: "transform, opacity",
            onComplete: () => {
              animationCompletedRef.current = true;
              onCompleteRef.current?.();
            },
          });
        },
      }) as SplitTextInstance;

      el._rbsplitInstance = splitInstance;

      return () => {
        ScrollTrigger.getAll().forEach((scrollTrigger) => {
          if (scrollTrigger.trigger === el) scrollTrigger.kill();
        });
        splitInstance.revert();
        el._rbsplitInstance = null;
      };
    },
    {
      dependencies: [
        text,
        delay,
        duration,
        ease,
        splitType,
        JSON.stringify(from),
        JSON.stringify(to),
        threshold,
        rootMargin,
        fontsLoaded,
      ],
      scope: ref,
    },
  );

  const Tag = tag;

  return (
    <Tag
      ref={ref}
      className={`split-parent ${className}`}
      style={{
        display: "inline-block",
        overflow: "hidden",
        textAlign,
        whiteSpace: "normal",
        willChange: "transform, opacity",
        wordWrap: "break-word",
      }}
    >
      {text}
    </Tag>
  );
}

export default SplitText;
