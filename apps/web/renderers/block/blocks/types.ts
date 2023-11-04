import type { Block } from "cms/src/payload-types";
import type { ArrElement } from "@/lib/type-helpers";

export type Blocks = ArrElement<Block["blocks"]>;