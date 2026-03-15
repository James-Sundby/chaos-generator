'use server';

import { redirect } from 'next/navigation';
import { warhostSearchObjectSchema } from '@/app/schema/warhost';

export async function warhostSearchServer(payload) {
    const parsed = warhostSearchObjectSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues?.[0]?.message || 'That id could not be used. Double-check and try again.',
        };
    }

    const canonical = parsed.data.q;
    redirect(`/warhost/${canonical}`);
}