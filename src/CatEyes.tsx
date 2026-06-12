import { useEffect, useRef } from "react";

function CatEyes() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const pupils = Array.from(root.querySelectorAll<HTMLElement>(".cat-eye-pupil"));

    const movePupils = (clientX: number, clientY: number) => {
      pupils.forEach((pupil) => {
        const eye = pupil.parentElement;
        if (!eye) return;

        const rect = eye.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        const angle = Math.atan2(clientY - eyeCenterY, clientX - eyeCenterX);
        const maxMove = Math.max(7, rect.width * 0.25);
        const pupilX = Math.cos(angle) * maxMove;
        const pupilY = Math.sin(angle) * maxMove;

        pupil.style.transform = `translate(calc(-50% + ${pupilX}px), calc(-50% + ${pupilY}px))`;
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      movePupils(event.clientX, event.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    movePupils(window.innerWidth / 2, window.innerHeight / 2);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  return (
    <div className="cat-companion" ref={rootRef} aria-label="会看向鼠标的猫咪" role="img">
      <div className="cat-companion-cat">
        <div className="cat-ear left" />
        <div className="cat-ear right" />

        <div className="cat-head">
          <div className="cat-face">
            <div className="cat-eye left">
              <div className="cat-eye-pupil" />
            </div>
            <div className="cat-eye right">
              <div className="cat-eye-pupil" />
            </div>

            <div className="cat-nose" />
            <div className="cat-mouth" />

            <div className="cat-whisker l1" />
            <div className="cat-whisker l2" />
            <div className="cat-whisker l3" />
            <div className="cat-whisker r1" />
            <div className="cat-whisker r2" />
            <div className="cat-whisker r3" />
          </div>
        </div>

        <div className="cat-body" />
        <div className="cat-tail" />
      </div>
    </div>
  );
}

export default CatEyes;
