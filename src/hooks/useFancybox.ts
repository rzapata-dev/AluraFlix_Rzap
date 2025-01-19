import { useEffect } from 'react';
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

export function useFancybox(selector: string, options = {}) {
  useEffect(() => {
    Fancybox.bind(selector, options);
    return () => {
      Fancybox.destroy();
    };
  }, [selector]);
}