import { createFileRoute } from "@tanstack/react-router";
import { Gallery } from "@/components/portfolio/Gallery";

export const Route = createFileRoute("/")({ component: Gallery });
