export type Project = {
  id: string;
  name: string;
  location: string;
  year: string | null;
  description: string;
  image: string;
  why: string;
  photos?: string[];
  people?: string[];
  outcomes?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    id: "hospital-reading-corners",
    name: "Hospital Reading Corners",
    location: "Nairobi, Kenya",
    year: "2024",
    description: "Small reading corners in hospital wards where volunteers read with patients and families.",
    image: "/images/hospital-reading-corners.jpeg",
    why: "Healing is not only medical. Stories and presence restore dignity.",
    photos: [],
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
    image: "/images/childrens-home-community.jpeg",
    why: "Children thrive when caring communities make time to listen, learn, and be present.",
  },
  {
    id: "community-care",
    name: "Community Care",
    location: "Kenya",
    year: null,
    description: "Community gatherings that create space for neighbors to connect and support one another.",
    image: "/images/kenya-community-gathering-2.jpg",
    why: "Strong relationships make it easier for people to care for one another.",
  },
];
