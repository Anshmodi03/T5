const courseCategories = [
  "All Categories",
  "Engineering",
  "Medical Sciences",
  "School Education",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Language Arts",
];

const courseLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

// Gradient styles for course cards
const gradientStyles = [
  "from-blue-600 to-indigo-600",
  "from-purple-600 to-pink-600",
  "from-teal-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-cyan-500 to-blue-500",
  "from-rose-500 to-purple-500",
  "from-amber-500 to-orange-500",
  "from-lime-500 to-green-500",
  "from-indigo-500 to-violet-500",
  "from-fuchsia-500 to-pink-500",
];

const courses = [
  {
    id: "engineering-mathematics",
    title: "Engineering Mathematics",
    description:
      "Master the mathematical concepts essential for engineering applications.",
    longDescription:
      "Build a strong foundation in mathematics for engineering applications with this comprehensive course. You'll learn calculus, linear algebra, differential equations, statistics, and numerical methods, with a focus on practical applications in engineering fields. Through problem-solving exercises and computational tools, you'll develop the mathematical skills needed to tackle complex engineering challenges.",
    category: "Engineering",
    level: "Intermediate",
    price: "$349",
    discountedPrice: "$249",
    duration: "16 weeks",
    batchSize: "35 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.6,
    studentsEnrolled: 8300,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[0],
    featured: true,
    instructor: {
      name: "Dr. Rahul Sharma",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Mathematics professor with 15+ years of experience teaching engineering students",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Calculus for Engineers",
        lessons: [
          "Limits and Continuity",
          "Differentiation and Applications",
          "Integration Techniques",
          "Multivariable Calculus",
        ],
      },
      {
        title: "Module 2: Linear Algebra",
        lessons: [
          "Matrices and Determinants",
          "Vector Spaces and Subspaces",
          "Eigenvalues and Eigenvectors",
          "Linear Transformations",
        ],
      },
      {
        title: "Module 3: Differential Equations",
        lessons: [
          "First-Order Differential Equations",
          "Second-Order Differential Equations",
          "Systems of Differential Equations",
          "Laplace Transforms",
        ],
      },
      {
        title: "Module 4: Probability and Statistics",
        lessons: [
          "Probability Distributions",
          "Statistical Inference",
          "Hypothesis Testing",
          "Regression Analysis",
        ],
      },
      {
        title: "Module 5: Numerical Methods",
        lessons: [
          "Numerical Integration",
          "Root-Finding Algorithms",
          "Numerical Solutions to ODEs",
          "Finite Difference Methods",
        ],
      },
    ],
    features: [
      "Interactive Math Visualizations",
      "MATLAB/Python Integration",
      "Engineering Application Examples",
      "Problem-Solving Workshops",
      "Formula Sheet Reference",
    ],
    testimonials: [
      {
        name: "Thomas Zhang",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course helped me understand the 'why' behind mathematical concepts I've been using in engineering. The practical examples were extremely helpful.",
        rating: 4.5,
      },
      {
        name: "Lakshmi Nair",
        image: "/placeholder.svg?height=50&width=50",
        text: "Dr. Sharma has a gift for making complex mathematical concepts accessible. This course gave me the confidence to tackle advanced engineering problems.",
        rating: 5,
      },
    ],
  },
  {
    id: "medical-anatomy",
    title: "Human Anatomy for Medical Students",
    description:
      "Comprehensive study of human anatomy with 3D visualizations and clinical correlations.",
    longDescription:
      "This detailed course covers the complete human anatomy with a focus on clinical applications. Using advanced 3D models, cadaveric images, and clinical case studies, you'll develop a thorough understanding of anatomical structures and their relationships. Perfect for medical students, the course emphasizes clinical correlations to help you apply anatomical knowledge to patient care scenarios.",
    category: "Medical Sciences",
    level: "Advanced",
    price: "$599",
    discountedPrice: "$449",
    duration: "24 weeks",
    batchSize: "30 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.9,
    studentsEnrolled: 6200,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[1],
    featured: true,
    instructor: {
      name: "Dr. Priya Singh",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Board-certified physician with 10+ years of clinical and teaching experience",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Introduction to Human Anatomy",
        lessons: [
          "Anatomical Terminology",
          "Body Organization",
          "Cells and Tissues",
          "Organ Systems Overview",
        ],
      },
      {
        title: "Module 2: Musculoskeletal System",
        lessons: [
          "Skeletal System",
          "Joints and Articulations",
          "Muscular System",
          "Clinical Applications",
        ],
      },
      {
        title: "Module 3: Cardiovascular and Respiratory Systems",
        lessons: [
          "Heart Anatomy",
          "Blood Vessels",
          "Respiratory Tract",
          "Clinical Correlations",
        ],
      },
      {
        title: "Module 4: Neuroanatomy",
        lessons: [
          "Central Nervous System",
          "Peripheral Nervous System",
          "Special Senses",
          "Clinical Neuroanatomy",
        ],
      },
      {
        title: "Module 5: Abdominal and Pelvic Anatomy",
        lessons: [
          "Digestive System",
          "Urinary System",
          "Reproductive System",
          "Clinical Case Studies",
        ],
      },
    ],
    features: [
      "3D Anatomical Models",
      "Virtual Dissection Lab",
      "Clinical Case Studies",
      "Medical Imaging Integration",
      "USMLE/NEET Question Bank",
    ],
    testimonials: [
      {
        name: "John Mehta",
        image: "/placeholder.svg?height=50&width=50",
        text: "The 3D models and clinical correlations helped me understand anatomy better than any textbook. This course was instrumental in my USMLE preparation.",
        rating: 5,
      },
      {
        name: "Emily Johnson",
        image: "/placeholder.svg?height=50&width=50",
        text: "Dr. Singh's explanations of complex anatomical relationships are exceptional. The course structure made it easy to progress through difficult concepts systematically.",
        rating: 4.8,
      },
    ],
  },
  {
    id: "physics-high-school",
    title: "High School Physics Mastery",
    description:
      "Build a strong foundation in physics concepts for high school students.",
    longDescription:
      "This course is designed to help high school students excel in physics. From mechanics to electricity and magnetism, you'll learn fundamental physics concepts through interactive simulations, problem-solving exercises, and real-world applications. The course aligns with AP Physics and IB Physics curricula, making it perfect for exam preparation while building a solid foundation for college-level physics.",
    category: "School Education",
    level: "Beginner",
    price: "$249",
    discountedPrice: "$179",
    duration: "12 weeks",
    batchSize: "40 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.7,
    studentsEnrolled: 9500,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[2],
    featured: false,
    instructor: {
      name: "Prof. Michael Chen",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Physics educator with 12+ years of experience teaching high school and AP Physics",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Mechanics",
        lessons: [
          "Kinematics",
          "Newton's Laws of Motion",
          "Work, Energy, and Power",
          "Momentum and Collisions",
        ],
      },
      {
        title: "Module 2: Waves and Optics",
        lessons: [
          "Wave Properties",
          "Sound Waves",
          "Reflection and Refraction",
          "Lenses and Mirrors",
        ],
      },
      {
        title: "Module 3: Electricity and Magnetism",
        lessons: [
          "Electric Charges and Fields",
          "Electric Circuits",
          "Magnetic Fields",
          "Electromagnetic Induction",
        ],
      },
      {
        title: "Module 4: Thermodynamics",
        lessons: [
          "Temperature and Heat",
          "Laws of Thermodynamics",
          "Heat Transfer",
          "Thermal Properties of Matter",
        ],
      },
      {
        title: "Module 5: Modern Physics",
        lessons: [
          "Special Relativity",
          "Quantum Physics",
          "Atomic Structure",
          "Nuclear Physics",
        ],
      },
    ],
    features: [
      "Interactive Physics Simulations",
      "Problem-Solving Workshops",
      "AP/IB Exam Preparation",
      "Virtual Lab Experiments",
      "Weekly Live Q&A Sessions",
    ],
    testimonials: [
      {
        name: "Alex Thompson",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course helped me go from a C to an A in my high school physics class. The simulations made abstract concepts much easier to understand.",
        rating: 5,
      },
      {
        name: "Sophia Lee",
        image: "/placeholder.svg?height=50&width=50",
        text: "Professor Chen explains complex physics concepts in a way that's easy to understand. I scored a 5 on my AP Physics exam thanks to this course!",
        rating: 4.5,
      },
    ],
  },
  {
    id: "organic-chemistry",
    title: "Organic Chemistry Fundamentals",
    description:
      "Master the principles of organic chemistry with practical applications.",
    longDescription:
      "This comprehensive organic chemistry course covers everything from basic concepts to advanced reaction mechanisms. Through interactive molecular modeling, virtual lab experiments, and problem-solving exercises, you'll develop a deep understanding of organic chemistry principles and their applications in medicine, materials science, and industry. The course is designed for college students and pre-med students preparing for MCAT.",
    category: "Chemistry",
    level: "Intermediate",
    price: "$399",
    discountedPrice: "$299",
    duration: "20 weeks",
    batchSize: "35 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 7200,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[3],
    featured: false,
    instructor: {
      name: "Dr. Sarah Johnson",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Organic chemistry professor with research experience in medicinal chemistry and drug design",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Structure and Bonding",
        lessons: [
          "Atomic Structure and Bonding",
          "Molecular Orbital Theory",
          "Hybridization",
          "Resonance Structures",
        ],
      },
      {
        title: "Module 2: Functional Groups",
        lessons: [
          "Alkanes and Cycloalkanes",
          "Alcohols and Ethers",
          "Aldehydes and Ketones",
          "Carboxylic Acids and Derivatives",
        ],
      },
      {
        title: "Module 3: Reaction Mechanisms",
        lessons: [
          "Nucleophilic Substitution",
          "Elimination Reactions",
          "Addition Reactions",
          "Radical Reactions",
        ],
      },
      {
        title: "Module 4: Spectroscopy",
        lessons: [
          "IR Spectroscopy",
          "NMR Spectroscopy",
          "Mass Spectrometry",
          "Structure Determination",
        ],
      },
      {
        title: "Module 5: Biomolecules",
        lessons: [
          "Carbohydrates",
          "Amino Acids and Proteins",
          "Lipids",
          "Nucleic Acids",
        ],
      },
    ],
    features: [
      "3D Molecular Modeling",
      "Virtual Organic Chemistry Lab",
      "MCAT Preparation Materials",
      "Reaction Mechanism Animations",
      "Problem-Solving Workshops",
    ],
    testimonials: [
      {
        name: "David Wilson",
        image: "/placeholder.svg?height=50&width=50",
        text: "Dr. Johnson's approach to teaching organic chemistry made a typically difficult subject much more approachable. The 3D models were especially helpful for visualizing molecular structures.",
        rating: 5,
      },
      {
        name: "Aisha Patel",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course was instrumental in my MCAT preparation. The practice problems and explanations helped me master organic chemistry concepts that I had struggled with before.",
        rating: 4.7,
      },
    ],
  },
  {
    id: "computer-science-fundamentals",
    title: "Computer Science Fundamentals",
    description:
      "Build a strong foundation in computer science principles and programming.",
    longDescription:
      "This course provides a comprehensive introduction to computer science fundamentals, covering algorithms, data structures, programming concepts, and computational thinking. Through hands-on coding exercises in Python and Java, you'll develop problem-solving skills and learn how to design efficient solutions to computational problems. Perfect for high school students, college freshmen, or anyone looking to enter the field of computer science.",
    category: "Computer Science",
    level: "Beginner",
    price: "$349",
    discountedPrice: "$249",
    duration: "16 weeks",
    batchSize: "40 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.7,
    studentsEnrolled: 11200,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[4],
    featured: true,
    instructor: {
      name: "Prof. James Wilson",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Computer Science professor with experience at leading tech companies and a passion for teaching",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Introduction to Programming",
        lessons: [
          "Programming Fundamentals",
          "Variables and Data Types",
          "Control Structures",
          "Functions and Methods",
        ],
      },
      {
        title: "Module 2: Data Structures",
        lessons: [
          "Arrays and Lists",
          "Stacks and Queues",
          "Trees and Graphs",
          "Hash Tables",
        ],
      },
      {
        title: "Module 3: Algorithms",
        lessons: [
          "Algorithm Analysis",
          "Searching Algorithms",
          "Sorting Algorithms",
          "Graph Algorithms",
        ],
      },
      {
        title: "Module 4: Object-Oriented Programming",
        lessons: [
          "Classes and Objects",
          "Inheritance and Polymorphism",
          "Encapsulation and Abstraction",
          "Design Patterns",
        ],
      },
      {
        title: "Module 5: Advanced Topics",
        lessons: [
          "Recursion",
          "Dynamic Programming",
          "Introduction to Databases",
          "Web Development Basics",
        ],
      },
    ],
    features: [
      "Interactive Coding Exercises",
      "Algorithm Visualizations",
      "Project-Based Learning",
      "Competitive Programming Challenges",
      "Career Guidance in Tech",
    ],
    testimonials: [
      {
        name: "Ryan Chen",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course provided an excellent foundation in computer science. The programming exercises and projects helped me apply theoretical concepts to real-world problems.",
        rating: 5,
      },
      {
        name: "Maria Rodriguez",
        image: "/placeholder.svg?height=50&width=50",
        text: "Professor Wilson's teaching style made complex computer science concepts accessible. I went from knowing nothing about programming to building my own applications by the end of the course.",
        rating: 4.6,
      },
    ],
  },
  {
    id: "advanced-biology",
    title: "Advanced Biology for Pre-Med Students",
    description:
      "Comprehensive biology course with a focus on medical applications.",
    longDescription:
      "This advanced biology course is designed specifically for pre-med students and those preparing for medical school. Covering cellular biology, genetics, physiology, and more, the course emphasizes clinical applications and MCAT preparation. Through virtual lab experiments, case studies, and interactive simulations, you'll develop a deep understanding of biological processes and their relevance to medicine.",
    category: "Biology",
    level: "Advanced",
    price: "$499",
    discountedPrice: "$379",
    duration: "24 weeks",
    batchSize: "30 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 5800,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[5],
    featured: false,
    instructor: {
      name: "Dr. Elizabeth Chen",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Molecular biologist with medical school teaching experience and research in cellular biology",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Cell Biology",
        lessons: [
          "Cell Structure and Function",
          "Membrane Transport",
          "Cellular Respiration",
          "Cell Signaling",
        ],
      },
      {
        title: "Module 2: Genetics and Molecular Biology",
        lessons: [
          "DNA Structure and Replication",
          "Gene Expression",
          "Genetic Engineering",
          "Genomics and Proteomics",
        ],
      },
      {
        title: "Module 3: Human Physiology",
        lessons: [
          "Nervous System",
          "Endocrine System",
          "Cardiovascular System",
          "Immune System",
        ],
      },
      {
        title: "Module 4: Developmental Biology",
        lessons: [
          "Embryonic Development",
          "Stem Cells",
          "Tissue Differentiation",
          "Aging and Regeneration",
        ],
      },
      {
        title: "Module 5: Medical Applications",
        lessons: [
          "Pathophysiology",
          "Pharmacology Basics",
          "Cancer Biology",
          "Infectious Diseases",
        ],
      },
    ],
    features: [
      "Virtual Biology Lab",
      "MCAT Biology Preparation",
      "Clinical Case Studies",
      "3D Biological Visualizations",
      "Research Paper Analysis",
    ],
    testimonials: [
      {
        name: "Jennifer Kim",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course was exactly what I needed for MCAT preparation. The clinical applications helped me understand how biological concepts apply to medicine.",
        rating: 5,
      },
      {
        name: "Michael Patel",
        image: "/placeholder.svg?height=50&width=50",
        text: "Dr. Chen's expertise in both biology and medicine made this course exceptional. The virtual labs and case studies provided practical experience that complemented the theoretical knowledge.",
        rating: 4.7,
      },
    ],
  },
  {
    id: "elementary-mathematics",
    title: "Elementary Mathematics Foundations",
    description:
      "Build strong math fundamentals for elementary school students.",
    longDescription:
      "This course is designed to help elementary school students build a strong foundation in mathematics. Through interactive lessons, games, and problem-solving activities, students will develop number sense, arithmetic skills, and basic geometric understanding. The course follows a progressive approach, ensuring that students master fundamental concepts before moving on to more advanced topics.",
    category: "School Education",
    level: "Beginner",
    price: "$199",
    discountedPrice: "$149",
    duration: "12 weeks",
    batchSize: "25 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.9,
    studentsEnrolled: 12500,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[6],
    featured: false,
    instructor: {
      name: "Ms. Rebecca Taylor",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Elementary education specialist with 15+ years of experience teaching mathematics to young learners",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Numbers and Counting",
        lessons: [
          "Number Recognition",
          "Counting Principles",
          "Place Value",
          "Comparing Numbers",
        ],
      },
      {
        title: "Module 2: Addition and Subtraction",
        lessons: [
          "Basic Addition",
          "Basic Subtraction",
          "Word Problems",
          "Mental Math Strategies",
        ],
      },
      {
        title: "Module 3: Multiplication and Division",
        lessons: [
          "Multiplication Concepts",
          "Division Concepts",
          "Times Tables",
          "Word Problems",
        ],
      },
      {
        title: "Module 4: Fractions and Decimals",
        lessons: [
          "Introduction to Fractions",
          "Equivalent Fractions",
          "Decimal Concepts",
          "Money Math",
        ],
      },
      {
        title: "Module 5: Geometry and Measurement",
        lessons: [
          "Shapes and Patterns",
          "Perimeter and Area",
          "Time and Calendar",
          "Units of Measurement",
        ],
      },
    ],
    features: [
      "Interactive Math Games",
      "Printable Worksheets",
      "Virtual Manipulatives",
      "Progress Tracking for Parents",
      "Adaptive Learning Path",
    ],
    testimonials: [
      {
        name: "Parent of Sam, 8",
        image: "/placeholder.svg?height=50&width=50",
        text: "My son used to struggle with math, but this course made it fun and engaging. The interactive games and visual explanations helped him understand concepts he had been struggling with.",
        rating: 5,
      },
      {
        name: "Parent of Mia, 9",
        image: "/placeholder.svg?height=50&width=50",
        text: "Ms. Taylor has a gift for teaching mathematics to children. My daughter looks forward to her math lessons now and has gained confidence in her abilities.",
        rating: 5,
      },
    ],
  },
  {
    id: "electrical-engineering",
    title: "Electrical Engineering Principles",
    description:
      "Comprehensive introduction to electrical engineering concepts and applications.",
    longDescription:
      "This course provides a thorough introduction to electrical engineering principles and applications. From circuit analysis to digital systems, you'll learn fundamental concepts through theoretical explanations, interactive simulations, and practical projects. The course is designed for engineering students and professionals looking to strengthen their understanding of electrical engineering fundamentals.",
    category: "Engineering",
    level: "Intermediate",
    price: "$449",
    discountedPrice: "$349",
    duration: "20 weeks",
    batchSize: "35 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.7,
    studentsEnrolled: 6800,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[7],
    featured: false,
    instructor: {
      name: "Prof. Robert Lee",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Electrical engineering professor with industry experience in power systems and electronics design",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Circuit Analysis",
        lessons: [
          "DC Circuit Analysis",
          "AC Circuit Analysis",
          "Network Theorems",
          "Transient Analysis",
        ],
      },
      {
        title: "Module 2: Electronics",
        lessons: [
          "Semiconductor Devices",
          "Diodes and Applications",
          "Transistors",
          "Operational Amplifiers",
        ],
      },
      {
        title: "Module 3: Digital Systems",
        lessons: [
          "Boolean Algebra",
          "Logic Gates",
          "Sequential Circuits",
          "Digital Design",
        ],
      },
      {
        title: "Module 4: Signals and Systems",
        lessons: [
          "Signal Representation",
          "Fourier Analysis",
          "Sampling and Modulation",
          "Filter Design",
        ],
      },
      {
        title: "Module 5: Power Systems",
        lessons: [
          "Power Generation",
          "Transmission and Distribution",
          "Electrical Machines",
          "Power Electronics",
        ],
      },
    ],
    features: [
      "Circuit Simulation Software",
      "Virtual Electronics Lab",
      "Hands-on Projects",
      "Industry Case Studies",
      "Design Challenges",
    ],
    testimonials: [
      {
        name: "Thomas Zhang",
        image: "/placeholder.svg?height=50&width=50",
        text: "Professor Lee's explanations of complex electrical concepts are clear and practical. The simulation tools helped me visualize circuit behavior and deepen my understanding.",
        rating: 4.5,
      },
      {
        name: "Sophia Rodriguez",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course provided an excellent foundation in electrical engineering. The hands-on projects were particularly valuable for applying theoretical knowledge to practical problems.",
        rating: 5,
      },
    ],
  },
  {
    id: "biochemistry-fundamentals",
    title: "Biochemistry Fundamentals",
    description:
      "Explore the chemistry of living organisms and biological processes.",
    longDescription:
      "This comprehensive biochemistry course explores the chemical processes and substances that occur within living organisms. From protein structure to metabolism, you'll learn fundamental biochemical concepts and their applications in medicine, nutrition, and biotechnology. Through interactive molecular visualizations, virtual lab experiments, and case studies, you'll develop a deep understanding of how chemistry supports biological functions.",
    category: "Medical Sciences",
    level: "Advanced",
    price: "$499",
    discountedPrice: "$379",
    duration: "20 weeks",
    batchSize: "30 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 5400,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[8],
    featured: false,
    instructor: {
      name: "Dr. Amanda Martinez",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Biochemist with research experience in protein chemistry and enzyme kinetics",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Biomolecules",
        lessons: [
          "Amino Acids and Proteins",
          "Carbohydrates",
          "Lipids",
          "Nucleic Acids",
        ],
      },
      {
        title: "Module 2: Protein Structure and Function",
        lessons: [
          "Protein Folding",
          "Protein Function",
          "Enzymes and Catalysis",
          "Enzyme Kinetics",
        ],
      },
      {
        title: "Module 3: Metabolism",
        lessons: [
          "Glycolysis",
          "Citric Acid Cycle",
          "Oxidative Phosphorylation",
          "Metabolic Integration",
        ],
      },
      {
        title: "Module 4: Molecular Biology",
        lessons: [
          "DNA Replication",
          "Transcription",
          "Translation",
          "Gene Regulation",
        ],
      },
      {
        title: "Module 5: Biochemical Applications",
        lessons: [
          "Medical Biochemistry",
          "Nutritional Biochemistry",
          "Biotechnology",
          "Research Methods",
        ],
      },
    ],
    features: [
      "3D Molecular Visualizations",
      "Virtual Biochemistry Lab",
      "MCAT/NEET Preparation",
      "Clinical Case Studies",
      "Research Paper Analysis",
    ],
    testimonials: [
      {
        name: "Daniel Kim",
        image: "/placeholder.svg?height=50&width=50",
        text: "Dr. Martinez makes biochemistry accessible and engaging. The 3D visualizations helped me understand protein structures in a way textbooks never could.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course was instrumental in my medical school preparation. The clinical applications helped me understand the relevance of biochemistry to medicine.",
        rating: 4.7,
      },
    ],
  },
  {
    id: "middle-school-language-arts",
    title: "Middle School Language Arts",
    description:
      "Develop strong reading, writing, and communication skills for middle school students.",
    longDescription:
      "This comprehensive language arts course is designed specifically for middle school students. Covering reading comprehension, writing skills, grammar, vocabulary, and literature analysis, the course helps students develop strong communication abilities. Through interactive lessons, writing workshops, and guided reading activities, students will enhance their critical thinking and literacy skills while fostering a love for reading and effective communication.",
    category: "Language Arts",
    level: "Beginner",
    price: "$249",
    discountedPrice: "$179",
    duration: "16 weeks",
    batchSize: "25 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 8700,
    image: "/placeholder.svg?height=300&width=500",
    gradient: gradientStyles[9],
    featured: false,
    instructor: {
      name: "Ms. Jennifer Adams",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Language arts specialist with 10+ years of experience teaching middle school English",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Reading Comprehension",
        lessons: [
          "Active Reading Strategies",
          "Main Idea and Supporting Details",
          "Making Inferences",
          "Literary Elements",
        ],
      },
      {
        title: "Module 2: Writing Skills",
        lessons: [
          "The Writing Process",
          "Narrative Writing",
          "Expository Writing",
          "Persuasive Writing",
        ],
      },
      {
        title: "Module 3: Grammar and Usage",
        lessons: [
          "Parts of Speech",
          "Sentence Structure",
          "Punctuation",
          "Common Grammar Mistakes",
        ],
      },
      {
        title: "Module 4: Vocabulary Development",
        lessons: [
          "Word Analysis",
          "Context Clues",
          "Figurative Language",
          "Word Relationships",
        ],
      },
      {
        title: "Module 5: Literature Study",
        lessons: ["Short Stories", "Poetry", "Novels", "Literary Analysis"],
      },
    ],
    features: [
      "Interactive Reading Activities",
      "Writing Workshops",
      "Grammar Practice",
      "Vocabulary Games",
      "Literature Discussions",
    ],
    testimonials: [
      {
        name: "Parent of Emma, 12",
        image: "/placeholder.svg?height=50&width=50",
        text: "My daughter's writing and reading skills have improved dramatically since taking this course. Ms. Adams makes language arts engaging and fun.",
        rating: 5,
      },
      {
        name: "Parent of Jason, 13",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course helped my son develop confidence in his communication skills. The interactive approach kept him motivated and interested.",
        rating: 4.7,
      },
    ],
  },
];

export { courses, courseCategories, courseLevels, gradientStyles };
