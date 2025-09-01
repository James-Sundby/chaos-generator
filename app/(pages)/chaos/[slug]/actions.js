'use server';

import { createWarband } from '@/lib/warband';
import { redirect } from 'next/navigation';

export async function createWarbandAndGo() {
    const band = createWarband();
    redirect(`/chaos/${band.slug}`);
}