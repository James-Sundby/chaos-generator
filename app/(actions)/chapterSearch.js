'use server';

import { redirect } from 'next/navigation';
import { chapterSearchObjectSchema } from '@/app/schema/chapter';

export async function chapterSearchServer(payload) {
    const parsed = chapterSearchObjectSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues?.[0]?.message || 'That id could not be used. Double-check and try again.',
        };
    }

    const canonical = parsed.data.q;
    redirect(`/chapter/${canonical}`);
}