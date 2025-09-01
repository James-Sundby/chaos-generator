'use server';

import { createChapter } from '@/utils/chapter';
import { redirect } from 'next/navigation';

export async function createChapterAndGo() {
    const chapter = createChapter();
    redirect(`/chapter/${chapter.slug}`);
}