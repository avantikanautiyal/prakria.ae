import { useEffect } from "react";
import { usePathname } from "next/navigation";

const useWow = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    let cancelled = false;

    const initWow = async () => {
      try {
        const module = await import("wowjs");
        const WOW = module?.default || module;
        if (cancelled) return;
        const wow = new WOW.WOW({
          boxClass: "wow",
          animateClass: "animated",
          offset: 80,
          mobile: true,
          live: true,
        });
        wow.init();
        window.WOW = wow;
      } catch (error) {
        console.warn("WOW init failed:", error);
      }
    };

    initWow();

    return () => {
      cancelled = true;
    };
  }, [pathname]);
};

export default useWow;
