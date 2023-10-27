import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { ZodError, z } from "zod";

// zod schema from revalidateObj
const revalidateSchema = z.object({
    tags: z.array(z.string()).optional(),
    paths: z.array(z.string()).optional()
})

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const body = revalidateSchema.parse(await request.json());

        if (body.tags && body.tags.length > 0) {
            body.tags.forEach(tag => {
                revalidateTag(tag);
            });
        }

        if (body.paths && body.paths.length > 0) {
            body.paths.forEach(path => {
                revalidatePath(path);
            });
        }

        return NextResponse.json({
            revalidated: true,
            now: Date.now()
        })
    } catch (err: unknown) {
        if (err instanceof ZodError) {
            return NextResponse.json({
                error: err.issues
            }, {
                status: 400
            });
        }

        return NextResponse.json({
            error: err
        }, {
            status: 400
        });

    }
}