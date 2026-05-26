// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const colleges = [
  {
    name: "Indian Institute of Technology Bombay",
    slug: "iit-bombay",
    location: "Mumbai, Maharashtra",
    city: "Mumbai",
    state: "Maharashtra",
    type: "IIT",
    category: "Engineering",
    rating: 4.8,
    totalReviews: 1240,
    established: 1958,
    totalStudents: 10000,
    fees: { min: 100000, max: 250000, ug: 200000, pg: 150000 },
    placements: {
      avgPackage: 2200000,
      highestPackage: 25000000,
      placementRate: 95,
      topRecruiters: ["Google", "Microsoft", "Goldman Sachs", "McKinsey", "Apple"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 90, fees: 200000 },
      { name: "B.Tech Electrical Engineering", duration: "4 years", seats: 80, fees: 200000 },
      { name: "B.Tech Mechanical Engineering", duration: "4 years", seats: 80, fees: 200000 },
      { name: "M.Tech", duration: "2 years", seats: 120, fees: 150000 },
      { name: "MBA", duration: "2 years", seats: 60, fees: 350000 },
      { name: "PhD", duration: "4-5 years", seats: 200, fees: 50000 },
    ],
    about:
      "IIT Bombay is one of the premier engineering institutions in India, established in 1958. Located in the financial capital Mumbai, it is consistently ranked among the top engineering colleges in Asia. Known for its excellent faculty, cutting-edge research, and strong industry connections.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria", "Gym", "Swimming Pool"],
    rankingNIRF: 3,
    rankingQS: 149,
    imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?w=800",
    websiteUrl: "https://www.iitb.ac.in",
  },
  {
    name: "Indian Institute of Technology Delhi",
    slug: "iit-delhi",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "IIT",
    category: "Engineering",
    rating: 4.7,
    totalReviews: 1100,
    established: 1961,
    totalStudents: 8500,
    fees: { min: 100000, max: 250000, ug: 200000, pg: 150000 },
    placements: {
      avgPackage: 2000000,
      highestPackage: 22000000,
      placementRate: 94,
      topRecruiters: ["Amazon", "Google", "Flipkart", "Adobe", "Qualcomm"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 85, fees: 200000 },
      { name: "B.Tech Electronics", duration: "4 years", seats: 75, fees: 200000 },
      { name: "B.Tech Civil Engineering", duration: "4 years", seats: 70, fees: 200000 },
      { name: "M.Tech", duration: "2 years", seats: 100, fees: 150000 },
      { name: "MBA", duration: "2 years", seats: 50, fees: 350000 },
    ],
    about:
      "IIT Delhi, established in 1961, is located in the heart of New Delhi. It is one of the oldest and most prestigious IITs in India, known for its world-class research facilities and outstanding placement record.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria", "Gym"],
    rankingNIRF: 2,
    rankingQS: 185,
    imageUrl: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    websiteUrl: "https://home.iitd.ac.in",
  },
  {
    name: "Indian Institute of Technology Madras",
    slug: "iit-madras",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "IIT",
    category: "Engineering",
    rating: 4.9,
    totalReviews: 1350,
    established: 1959,
    totalStudents: 9000,
    fees: { min: 100000, max: 250000, ug: 200000, pg: 150000 },
    placements: {
      avgPackage: 2100000,
      highestPackage: 28000000,
      placementRate: 96,
      topRecruiters: ["Google", "Microsoft", "Oracle", "Cisco", "Samsung"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 80, fees: 200000 },
      { name: "B.Tech Aerospace", duration: "4 years", seats: 60, fees: 200000 },
      { name: "B.Tech Chemical Engineering", duration: "4 years", seats: 65, fees: 200000 },
      { name: "M.Tech", duration: "2 years", seats: 110, fees: 150000 },
    ],
    about:
      "IIT Madras, ranked #1 by NIRF for multiple consecutive years, is India's top engineering institution. Set in a beautiful forested campus in Chennai, it is renowned for its research output and startup ecosystem.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria", "Research Park", "Swimming Pool"],
    rankingNIRF: 1,
    rankingQS: 227,
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800",
    websiteUrl: "https://www.iitm.ac.in",
  },
  {
    name: "National Institute of Technology Trichy",
    slug: "nit-trichy",
    location: "Tiruchirappalli, Tamil Nadu",
    city: "Tiruchirappalli",
    state: "Tamil Nadu",
    type: "NIT",
    category: "Engineering",
    rating: 4.4,
    totalReviews: 820,
    established: 1964,
    totalStudents: 6000,
    fees: { min: 60000, max: 150000, ug: 120000, pg: 90000 },
    placements: {
      avgPackage: 900000,
      highestPackage: 4200000,
      placementRate: 85,
      topRecruiters: ["TCS", "Infosys", "Wipro", "L&T", "Cognizant"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 60, fees: 120000 },
      { name: "B.Tech Mechanical", duration: "4 years", seats: 60, fees: 120000 },
      { name: "B.Tech Civil", duration: "4 years", seats: 50, fees: 120000 },
      { name: "M.Tech", duration: "2 years", seats: 80, fees: 90000 },
    ],
    about:
      "NIT Trichy is consistently ranked as the best NIT in India. It offers excellent engineering programs with strong industry connections and a vibrant campus life.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Cafeteria", "Gym"],
    rankingNIRF: 8,
    rankingQS: null,
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
    websiteUrl: "https://www.nitt.edu",
  },
  {
    name: "BITS Pilani",
    slug: "bits-pilani",
    location: "Pilani, Rajasthan",
    city: "Pilani",
    state: "Rajasthan",
    type: "Deemed",
    category: "Engineering",
    rating: 4.5,
    totalReviews: 950,
    established: 1964,
    totalStudents: 12000,
    fees: { min: 300000, max: 550000, ug: 500000, pg: 350000 },
    placements: {
      avgPackage: 1400000,
      highestPackage: 12000000,
      placementRate: 90,
      topRecruiters: ["Microsoft", "Amazon", "Goldman Sachs", "DE Shaw", "Tower Research"],
    },
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", seats: 120, fees: 500000 },
      { name: "B.E. Electronics", duration: "4 years", seats: 100, fees: 500000 },
      { name: "B.E. Mechanical", duration: "4 years", seats: 80, fees: 500000 },
      { name: "M.Sc. Mathematics", duration: "5 years", seats: 70, fees: 450000 },
      { name: "MBA", duration: "2 years", seats: 60, fees: 600000 },
    ],
    about:
      "BITS Pilani is one of India's premier private technical universities. Known for its unique dual-degree programs and Practice School internships, it produces some of India's most innovative engineers.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria", "Gym", "Shopping Center"],
    rankingNIRF: 23,
    rankingQS: 801,
    imageUrl: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=800",
    websiteUrl: "https://www.bits-pilani.ac.in",
  },
  {
    name: "Delhi Technological University",
    slug: "dtu-delhi",
    location: "New Delhi, Delhi",
    city: "New Delhi",
    state: "Delhi",
    type: "Government",
    category: "Engineering",
    rating: 4.1,
    totalReviews: 680,
    established: 1941,
    totalStudents: 8000,
    fees: { min: 80000, max: 180000, ug: 150000, pg: 100000 },
    placements: {
      avgPackage: 850000,
      highestPackage: 4500000,
      placementRate: 82,
      topRecruiters: ["Amazon", "Samsung", "Deloitte", "Accenture", "Zomato"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 180, fees: 150000 },
      { name: "B.Tech Software Engineering", duration: "4 years", seats: 90, fees: 150000 },
      { name: "B.Tech Electronics", duration: "4 years", seats: 120, fees: 150000 },
      { name: "M.Tech", duration: "2 years", seats: 100, fees: 100000 },
    ],
    about:
      "Delhi Technological University, formerly Delhi College of Engineering, is one of the oldest technical universities in India. Located in the capital, it offers excellent engineering programs with strong placement support.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Cafeteria"],
    rankingNIRF: 36,
    rankingQS: null,
    imageUrl: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800",
    websiteUrl: "http://www.dtu.ac.in",
  },
  {
    name: "VIT Vellore",
    slug: "vit-vellore",
    location: "Vellore, Tamil Nadu",
    city: "Vellore",
    state: "Tamil Nadu",
    type: "Private",
    category: "Engineering",
    rating: 4.0,
    totalReviews: 1580,
    established: 1984,
    totalStudents: 50000,
    fees: { min: 180000, max: 400000, ug: 350000, pg: 250000 },
    placements: {
      avgPackage: 700000,
      highestPackage: 4400000,
      placementRate: 80,
      topRecruiters: ["TCS", "Infosys", "Wipro", "HCL", "Zoho"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 800, fees: 350000 },
      { name: "B.Tech AI & ML", duration: "4 years", seats: 300, fees: 380000 },
      { name: "B.Tech Electronics", duration: "4 years", seats: 600, fees: 350000 },
      { name: "M.Tech", duration: "2 years", seats: 400, fees: 250000 },
      { name: "MBA", duration: "2 years", seats: 200, fees: 400000 },
    ],
    about:
      "VIT Vellore is one of India's largest private universities, known for its international collaborations, modern infrastructure, and active placement cell. It attracts students from across India and abroad.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria", "Gym", "Swimming Pool", "Auditorium"],
    rankingNIRF: 11,
    rankingQS: 751,
    imageUrl: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800",
    websiteUrl: "https://vit.ac.in",
  },
  {
    name: "Jadavpur University",
    slug: "jadavpur-university",
    location: "Kolkata, West Bengal",
    city: "Kolkata",
    state: "West Bengal",
    type: "Government",
    category: "Engineering",
    rating: 4.2,
    totalReviews: 740,
    established: 1955,
    totalStudents: 15000,
    fees: { min: 20000, max: 60000, ug: 50000, pg: 35000 },
    placements: {
      avgPackage: 800000,
      highestPackage: 3800000,
      placementRate: 78,
      topRecruiters: ["TCS", "Infosys", "IBM", "Capgemini", "Accenture"],
    },
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", seats: 60, fees: 50000 },
      { name: "B.E. Electronics", duration: "4 years", seats: 60, fees: 50000 },
      { name: "B.E. Mechanical", duration: "4 years", seats: 60, fees: 50000 },
      { name: "M.E.", duration: "2 years", seats: 80, fees: 35000 },
    ],
    about:
      "Jadavpur University is one of the most prestigious public universities in eastern India. Known for its strong academics, research focus, and affordability, it has produced many distinguished alumni in engineering and sciences.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Cafeteria"],
    rankingNIRF: 12,
    rankingQS: null,
    imageUrl: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=800",
    websiteUrl: "http://www.jaduniv.edu.in",
  },
  {
    name: "Manipal Institute of Technology",
    slug: "manipal-institute",
    location: "Manipal, Karnataka",
    city: "Manipal",
    state: "Karnataka",
    type: "Deemed",
    category: "Engineering",
    rating: 3.9,
    totalReviews: 1200,
    established: 1957,
    totalStudents: 14000,
    fees: { min: 200000, max: 450000, ug: 400000, pg: 280000 },
    placements: {
      avgPackage: 650000,
      highestPackage: 3500000,
      placementRate: 75,
      topRecruiters: ["Infosys", "TCS", "Wipro", "Mindtree", "Mphasis"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 240, fees: 400000 },
      { name: "B.Tech Mechanical", duration: "4 years", seats: 180, fees: 400000 },
      { name: "B.Tech Civil", duration: "4 years", seats: 120, fees: 400000 },
      { name: "M.Tech", duration: "2 years", seats: 100, fees: 280000 },
    ],
    about:
      "Manipal Institute of Technology is part of Manipal Academy of Higher Education. Known for its beautiful campus, diverse student population, and strong alumni network in IT and healthcare sectors.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria", "Gym", "Beach"],
    rankingNIRF: 40,
    rankingQS: null,
    imageUrl: "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?w=800",
    websiteUrl: "https://manipal.edu/mit.html",
  },
  {
    name: "SRM Institute of Science and Technology",
    slug: "srm-chennai",
    location: "Chennai, Tamil Nadu",
    city: "Chennai",
    state: "Tamil Nadu",
    type: "Deemed",
    category: "Engineering",
    rating: 3.7,
    totalReviews: 1800,
    established: 1985,
    totalStudents: 52000,
    fees: { min: 180000, max: 380000, ug: 320000, pg: 220000 },
    placements: {
      avgPackage: 600000,
      highestPackage: 3200000,
      placementRate: 72,
      topRecruiters: ["Infosys", "TCS", "Wipro", "Zoho", "CTS"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 1200, fees: 320000 },
      { name: "B.Tech AI & Data Science", duration: "4 years", seats: 600, fees: 350000 },
      { name: "B.Tech Electronics", duration: "4 years", seats: 800, fees: 320000 },
      { name: "MBA", duration: "2 years", seats: 300, fees: 380000 },
    ],
    about:
      "SRM Institute is one of India's largest private universities with a strong focus on engineering and technology. Its large campus near Chennai offers extensive facilities and a vibrant student community.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria", "Gym", "Swimming Pool"],
    rankingNIRF: 30,
    rankingQS: 801,
    imageUrl: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800",
    websiteUrl: "https://www.srmist.edu.in",
  },
  {
    name: "NIT Warangal",
    slug: "nit-warangal",
    location: "Warangal, Telangana",
    city: "Warangal",
    state: "Telangana",
    type: "NIT",
    category: "Engineering",
    rating: 4.3,
    totalReviews: 760,
    established: 1959,
    totalStudents: 5500,
    fees: { min: 60000, max: 150000, ug: 120000, pg: 90000 },
    placements: {
      avgPackage: 950000,
      highestPackage: 4800000,
      placementRate: 86,
      topRecruiters: ["Microsoft", "Amazon", "Walmart Labs", "Samsung", "Intel"],
    },
    courses: [
      { name: "B.Tech Computer Science", duration: "4 years", seats: 60, fees: 120000 },
      { name: "B.Tech ECE", duration: "4 years", seats: 60, fees: 120000 },
      { name: "B.Tech Mechanical", duration: "4 years", seats: 60, fees: 120000 },
      { name: "M.Tech", duration: "2 years", seats: 80, fees: 90000 },
    ],
    about:
      "NIT Warangal, established in 1959, is one of the oldest and most prestigious NITs in India. Located in Telangana, it is known for its strong academics, research culture, and excellent placements in core engineering and IT sectors.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Hospital", "Cafeteria"],
    rankingNIRF: 14,
    rankingQS: null,
    imageUrl: "https://images.unsplash.com/photo-1567168544230-e37b24e18c1e?w=800",
    websiteUrl: "https://www.nitw.ac.in",
  },
  {
    name: "Thapar Institute of Engineering",
    slug: "thapar-patiala",
    location: "Patiala, Punjab",
    city: "Patiala",
    state: "Punjab",
    type: "Deemed",
    category: "Engineering",
    rating: 4.0,
    totalReviews: 550,
    established: 1956,
    totalStudents: 12000,
    fees: { min: 200000, max: 380000, ug: 350000, pg: 250000 },
    placements: {
      avgPackage: 850000,
      highestPackage: 4200000,
      placementRate: 83,
      topRecruiters: ["Amazon", "Google", "Adobe", "Sapient", "Qualcomm"],
    },
    courses: [
      { name: "B.E. Computer Science", duration: "4 years", seats: 200, fees: 350000 },
      { name: "B.E. Electronics", duration: "4 years", seats: 160, fees: 350000 },
      { name: "B.E. Mechanical", duration: "4 years", seats: 120, fees: 350000 },
      { name: "M.E.", duration: "2 years", seats: 80, fees: 250000 },
    ],
    about:
      "Thapar Institute is one of the top private engineering universities in North India. Known for its industry collaborations, modern labs, and strong alumni network, it offers a great blend of academics and campus life.",
    facilities: ["Library", "Sports Complex", "Hostel", "Labs", "Cafeteria", "Gym"],
    rankingNIRF: 28,
    rankingQS: null,
    imageUrl: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0?w=800",
    websiteUrl: "https://www.thapar.edu",
  },
];

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.answer.deleteMany();
  await prisma.question.deleteMany();
  await prisma.review.deleteMany();
  await prisma.savedCollege.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  // Create colleges
  for (const college of colleges) {
    await prisma.college.create({ data: college });
  }
  console.log(`✅ Created ${colleges.length} colleges`);

  // Create demo user
  const hashedPassword = await bcrypt.hash("demo123", 10);
  const user = await prisma.user.create({
    data: {
      name: "Demo User",
      email: "demo@campusfind.in",
      password: hashedPassword,
    },
  });
  console.log(`✅ Created demo user: demo@campusfind.in / demo123`);

  // Create some reviews
  const allColleges = await prisma.college.findMany({ take: 4 });
  const reviewData = [
    {
      rating: 5,
      title: "Best decision of my life",
      content: "The campus life, academics, and placement support are all top-notch. Highly recommend this institution to any serious engineering aspirant.",
      pros: "Great faculty, excellent placements, amazing alumni network",
      cons: "Very competitive environment, high academic pressure",
      batch: 2023,
      course: "B.Tech Computer Science",
    },
    {
      rating: 4,
      title: "Solid academics and good placements",
      content: "Good infrastructure and knowledgeable faculty. The placement cell is very active and ensures most students get good offers.",
      pros: "Good labs, active placement cell",
      cons: "Hostel facilities could be better",
      batch: 2022,
      course: "B.Tech Electronics",
    },
  ];

  for (const college of allColleges) {
    for (const review of reviewData) {
      await prisma.review.create({
        data: { ...review, userId: user.id, collegeId: college.id },
      });
    }
  }
  console.log("✅ Created sample reviews");
  console.log("🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
