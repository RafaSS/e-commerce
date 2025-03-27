import { useState } from "nuxt/app";

export const useToast = () => {
  const toasts = useState<any[]>("toasts", () => []);

  const add = (toast: any) => {
    const id = Date.now();
    toasts.value.push({
      id,
      ...toast,
    });

    if (toast.duration) {
      setTimeout(() => {
        remove(id);
      }, toast.duration);
    }

    return id;
  };

  const remove = (id: number) => {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  };

  return {
    add,
    remove,
    toasts,
  };
};
