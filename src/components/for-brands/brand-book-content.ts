export const BOOK_CHAPTER_COUNT = 4;

export type BookChapterCopy = {
  service: string;
  headline: string[];
  promise: string;
  body: string;
  deliverables: string[];
  caption: string;
  footer: string;
};

export type BookSceneCopy = {
  coverDisciplines: string[];
  coverTitle: string;
  coverTagline: string;
  studyLabel: string;
};

export function chapterAt(progress: number) {
  return Math.min(3, Math.max(0, Math.floor((progress - 0.32) / 0.205)));
}
