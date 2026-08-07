import { useEffect, useRef, useState } from "react";

export default function Music() {

  const audioRef = useRef(null);

  const [started, setStarted] = useState(false);

  useEffect(() => {

    const startMusic = () => {

      if (started) return;

      if (!audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          setStarted(true);
        })
        .catch(() => {});

    };

    window.addEventListener("click", startMusic);
    window.addEventListener("touchstart", startMusic);

    return () => {

      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);

    };

  }, [started]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/happy-birthday.mp3"
        loop
        preload="auto"
      />

      <div className="fixed right-5 top-5 z-50">

        <button
          onClick={() => {

            if (!audioRef.current) return;

            if (audioRef.current.paused) {

              audioRef.current.play();
              setStarted(true);

            } else {

              audioRef.current.pause();

            }

          }}
          className="
          glass
          rounded-full
          px-4
          py-3
          text-xl
          shadow-xl
          hover:scale-110
          transition
          "
        >
          🎵
        </button>

      </div>
    </>
  );
}