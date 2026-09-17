import type { Metadata } from "next";
import { DemoApp } from "@/components/demo/DemoApp";

export const metadata: Metadata = {
  title: "Demo — Gloss",
  description:
    "Live in-browser Gloss demo. Soft Glam and other looks on a real portrait — same canvas pipeline as Studio. Made By Zer01.",
};

export default function DemoPage() {
  return <DemoApp />;
}
