import heartbeat from "./books/the-100-day-heartbeat.json";

export const books = [
  {
    id: heartbeat.slug,
    ...heartbeat,
    chapters: [
      { number: 1, title: "Day 1 — The Quiet Beginning", free: true },
      { number: 2, title: "Day 2 — Listening Again", free: true },
      { number: 3, title: "Day 3 — Growing Where You Are Planted", free: true },
    ],
  },
];

export type BookOption = Pick<(typeof books)[number], "slug" | "title">;
