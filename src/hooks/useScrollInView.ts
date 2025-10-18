import { useEffect, useState, RefObject } from "react";

/**
 * Hook mejorado que detecta cuando un elemento entra/sale de la vista
 * y REINICIA las animaciones cada vez que vuelve a entrar
 */
export function useScrollInView(ref: RefObject<HTMLElement>, threshold: number = 0.2) {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setHasBeenInView(true);
        }
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, threshold]);

  return { isInView, hasBeenInView };
}
