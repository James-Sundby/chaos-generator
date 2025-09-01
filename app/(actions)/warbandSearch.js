'use server';

import { redirect } from 'next/navigation';
import { chaosSearchObjectSchema } from '@/app/schema/chaos';

export async function warbandSearchServer(payload) {
    const parsed = chaosSearchObjectSchema.safeParse(payload);
    if (!parsed.success) {
        return {
            error: parsed.error.issues?.[0]?.message || 'That id could not be used. Double-check and try again.',
        };
    }

    const canonical = parsed.data.q;
    redirect(`/chaos/${canonical}`);
}