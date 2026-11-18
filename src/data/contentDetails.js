
/*
 * Temporary detail-page content.
 * When the CMS is ready, these records will come
 * from Supabase instead of a local JavaScript file.
 */

const images = {
  meeting:
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&q=85",
  leadership:
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1400&q=85",
  teamwork:
    "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1400&q=85",
  collaboration:
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1400&q=85",
  office:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&q=85",
  research:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&q=85",
  discussion:
    "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1400&q=85",
};

// These IDs match the sample records in News.jsx.
export const newsDetails = [
  {
    id: "1",
    title: "Advancing Gender Equality in Myanmar's Workplaces",
    category: "Workplace Equality",
    date: "2026-10-20",
    image: images.meeting,
    excerpt:
      "Exploring approaches that can support businesses in building fairer and more inclusive working environments.",
  },
  {
    id: "2",
    title: "Supporting Women's Leadership in Business",
    category: "Leadership",
    date: "2026-10-15",
    image: images.leadership,
    excerpt:
      "Understanding the importance of leadership opportunities and professional development for women.",
  },
  {
    id: "3",
    title: "Building More Inclusive Workplace Cultures",
    category: "Workplace Equality",
    date: "2026-10-10",
    image: images.teamwork,
    excerpt:
      "How organizations can encourage respectful, supportive, and inclusive workplace environments.",
  },
  {
    id: "4",
    title: "Connecting Businesses Through Collaboration",
    category: "Partnerships",
    date: "2026-09-25",
    image: images.collaboration,
    excerpt:
      "The role of business collaboration and knowledge sharing in advancing gender equality.",
  },
  {
    id: "5",
    title: "Learning Opportunities for Inclusive Leadership",
    category: "Leadership",
    date: "2026-09-18",
    image: images.office,
    excerpt:
      "Exploring learning approaches that help managers and teams strengthen inclusive leadership practices.",
  },
  {
    id: "6",
    title: "The Importance of Workplace Equality Assessments",
    category: "Research & Insights",
    date: "2026-09-10",
    image: images.research,
    excerpt:
      "Understanding how workplace assessments can identify strengths and opportunities for improvement.",
  },
  {
    id: "7",
    title: "Encouraging Shared Commitment to Gender Equality",
    category: "Partnerships",
    date: "2026-08-22",
    image: images.discussion,
    excerpt:
      "Why shared business commitments can contribute to sustainable workplace improvements.",
  },
];

// These IDs match the sample records in Articles.jsx.
export const articleDetails = [
  {
    id: "1",
    title: "Why Workplace Gender Equality Matters for Business",
    category: "Workplace Equality",
    date: "2026-10-25",
    image: images.meeting,
    readingTime: 6,
    excerpt:
      "Explore why gender equality is an important consideration for businesses and how inclusive workplaces can benefit employees and organizations.",
  },
  {
    id: "2",
    title: "Building Inclusive Leadership in the Workplace",
    category: "Leadership",
    date: "2026-10-12",
    image: images.leadership,
    readingTime: 5,
    excerpt:
      "Discover leadership practices that encourage participation, respect, and equal opportunities across teams.",
  },
  {
    id: "3",
    title: "Understanding Unconscious Bias at Work",
    category: "Diversity & Inclusion",
    date: "2026-09-28",
    image: images.teamwork,
    readingTime: 7,
    excerpt:
      "Learn how unconscious bias can influence workplace decisions and explore practical approaches to addressing it.",
  },
  {
    id: "4",
    title: "Creating Fair Recruitment and Promotion Practices",
    category: "Workplace Equality",
    date: "2026-09-15",
    image: images.office,
    readingTime: 6,
    excerpt:
      "Explore how transparent recruitment and promotion processes can support equitable workplace opportunities.",
  },
  {
    id: "5",
    title: "Supporting Women in Leadership Roles",
    category: "Leadership",
    date: "2026-08-22",
    image: images.collaboration,
    readingTime: 5,
    excerpt:
      "Understand the importance of mentorship, professional development, and organizational support for women leaders.",
  },
  {
    id: "6",
    title: "The Role of Workplace Equality Assessments",
    category: "Research & Insights",
    date: "2026-08-10",
    image: images.research,
    readingTime: 8,
    excerpt:
      "Explore how workplace assessments and employee feedback can help organizations identify opportunities for improvement.",
  },
  {
    id: "7",
    title: "Flexible Working Arrangements and Inclusion",
    category: "Diversity & Inclusion",
    date: "2026-07-18",
    image: images.meeting,
    readingTime: 5,
    excerpt:
      "Consider how flexible working practices can help organizations respond to diverse employee needs.",
  },
  {
    id: "8",
    title: "Building Respectful and Safe Workplaces",
    category: "Workplace Equality",
    date: "2026-07-02",
    image: images.discussion,
    readingTime: 7,
    excerpt:
      "Learn about organizational practices that encourage workplace respect, clear expectations, and employee wellbeing.",
  },
];

/*
 * Example full-body content.
 * Additional stories will use temporary preview text
 * until approved article bodies are supplied.
 */
export const sampleBodies = {
  "articles/1": [
    {
      heading: "Understanding Workplace Gender Equality",
      paragraphs: [
        "Workplace gender equality means that people have access to fair opportunities, resources, responsibilities, and career development regardless of gender.",
        "For businesses, this can involve reviewing organizational policies, recruitment practices, leadership opportunities, employee wellbeing, and workplace culture.",
      ],
    },
    {
      heading: "Why It Matters for Organizations",
      paragraphs: [
        "Inclusive working environments can help employees participate more effectively, share different perspectives, and contribute their skills.",
        "Advancing workplace gender equality requires consistent leadership commitment, transparent policies, and opportunities for meaningful employee participation.",
      ],
    },
    {
      heading: "Steps Businesses Can Consider",
      paragraphs: [
        "Organizations can begin by reviewing existing workplace policies, examining recruitment and promotion processes, and gathering employee feedback.",
        "Regular learning, assessment, and practical improvements can help businesses move from commitments toward more equitable workplace practices.",
      ],
    },
  ],
  "news/1": [
    {
      heading: "Creating Opportunities for Inclusive Workplaces",
      paragraphs: [
        "Businesses play an important role in shaping workplace environments where employees can participate, develop their skills, and access fair opportunities.",
        "Discussions around workplace gender equality often focus on organizational leadership, respectful workplace practices, and access to professional development.",
      ],
    },
    {
      heading: "The Role of Collaboration",
      paragraphs: [
        "Knowledge sharing and collaboration can help organizations explore different approaches to improving workplace equality.",
        "Engaging employees and reviewing workplace practices can also help identify challenges that require attention.",
      ],
    },
  ],
};

// Retrieve a record using the type and URL ID.
export function getContentDetail(type, id) {
  const collection =
    type === "news" ? newsDetails : articleDetails;

  return collection.find(
    (item) => item.id === String(id)
  );
}
