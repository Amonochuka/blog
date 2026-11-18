export type Project = {
  id: string;
  name: string;
  location: string;
  year: string | null;
  description: string;
  story?: string;
  image: string;
  why: string;
  photos?: string[];
  people?: string[];
  outcomes?: string;
  featured?: boolean;
};

// Link a published story to a project by adding `project:<project id>` to its tags in the admin editor.

export const projects: Project[] = [
  {
    id: "hospital-reading-corners",
    name: "Hospital Reading Corners",
    location: "Nairobi, Kenya",
    year: "2024",
    description: "Small reading corners in hospital wards where volunteers read with patients and families.",
    story: "A small idea with a big heart: place books and people in hospital wards, and let presence do the healing.",
    image: "/images/hospital-reading-corners.jpeg",
    why: "Healing is not only medical. Stories and presence restore dignity.",
    photos: ["/images/hospital-reading-corners.jpeg"],
    people: ["Volunteers", "Nurses", "Patients"],
    outcomes: "Three reading corners established. Over 120 reading sessions held.",
    featured: true,
  },
  {
    id: "childrens-home",
    name: "Children's Home",
    location: "Kenya",
    year: null,
    description: "Community visits and shared activities at children's homes.",
    photos: ["/images/childrens-home-community.jpeg"],
    image: "/images/childrens-home-community.jpeg",
    why: "Children thrive when caring communities make time to listen, learn, and be present.",
  },
  {
    id: "community-care",
    name: "Community Care",
    location: "Kenya",
    year: null,
    description: "Community gatherings that create space for neighbors to connect and support one another.",
    photos: ["/images/kenya-community-gathering-2.jpg", "/images/kenya-community-gathering.jpg"],
    image: "/images/kenya-community-gathering-2.jpg",
    why: "Strong relationships make it easier for people to care for one another.",
  },
];
