import { create } from "zustand";
import { persist } from "zustand/middleware";
import { DEFAULT_COPY, type PortfolioCopy } from "./defaults";

type PortfolioState = {
  slug: string;
  copy: PortfolioCopy;
  defaults: PortfolioCopy;
  copies: Record<string, PortfolioCopy>;
  editMode: boolean;
  openProject: (slug: string, defaults: PortfolioCopy) => void;
  setField: (key: keyof PortfolioCopy, value: string) => void;
  setCopy: (next: Partial<PortfolioCopy>) => void;
  setEditMode: (on: boolean) => void;
  resetCopy: () => void;
};

export const usePortfolio = create<PortfolioState>()(
  persist(
    (set) => ({
      slug: "50-brk-480",
      copy: DEFAULT_COPY,
      defaults: DEFAULT_COPY,
      copies: {},
      editMode: false,
      openProject: (slug, defaults) =>
        set((s) => ({
          slug,
          defaults,
          copy: { ...defaults, ...(s.copies[slug] ?? {}) },
        })),
      setField: (key, value) =>
        set((s) => {
          const copy = { ...s.copy, [key]: value };
          return {
            copy,
            copies: { ...s.copies, [s.slug]: copy },
          };
        }),
      setCopy: (next) =>
        set((s) => {
          const copy = { ...s.copy, ...next };
          return {
            copy,
            copies: { ...s.copies, [s.slug]: copy },
          };
        }),
      setEditMode: (on) => set({ editMode: on }),
      resetCopy: () =>
        set((s) => ({
          copy: s.defaults,
          copies: { ...s.copies, [s.slug]: s.defaults },
        })),
    }),
    {
      name: "hull-portfolio-v2",
      partialize: (s) => ({ copies: s.copies }),
    },
  ),
);
