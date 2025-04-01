const courseCategories = [
  "All Categories",
  "Web Development",
  "Data Science",
  "Mobile Development",
  "UI/UX Design",
  "Cybersecurity",
  "Cloud Computing",
  "Artificial Intelligence",
  "Engineering",
  "Medical",
  "Computer Science",
];

const courseLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"];

const courses = [
  {
    id: "full-stack-web-dev",
    title: "Full Stack Web Development",
    description:
      "Master front-end and back-end development with hands-on projects.",
    longDescription:
      "This comprehensive course covers everything you need to become a professional full-stack web developer. From HTML, CSS, and JavaScript to React, Node.js, and MongoDB, you'll learn all the essential technologies used in modern web development. Through hands-on projects and real-world applications, you'll build a strong portfolio that showcases your skills to potential employers.",
    category: "Web Development",
    level: "Intermediate",
    price: "$499",
    discountedPrice: "$349",
    duration: "24 weeks",
    batchSize: "30 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 12500,
    image: "/placeholder.svg?height=300&width=500",
    instructor: {
      name: "Dr. Alakh Pandey",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Expert in Web Development with 10+ years of teaching experience",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Front-End Fundamentals",
        lessons: [
          "HTML5 Semantic Elements",
          "CSS3 Layouts and Flexbox",
          "JavaScript ES6+ Features",
          "Responsive Design Principles",
        ],
      },
      {
        title: "Module 2: React Framework",
        lessons: [
          "React Components and Props",
          "State Management with Hooks",
          "Context API and Redux",
          "React Router for Navigation",
        ],
      },
      {
        title: "Module 3: Back-End Development",
        lessons: [
          "Node.js Fundamentals",
          "Express.js Framework",
          "RESTful API Design",
          "Authentication and Authorization",
        ],
      },
      {
        title: "Module 4: Database Integration",
        lessons: [
          "MongoDB Basics",
          "Mongoose ODM",
          "SQL vs NoSQL",
          "Database Design Patterns",
        ],
      },
      {
        title: "Module 5: Deployment and DevOps",
        lessons: [
          "Git Version Control",
          "CI/CD Pipelines",
          "Cloud Deployment (AWS/Heroku)",
          "Performance Optimization",
        ],
      },
    ],
    features: [
      "24/7 Doubt Support",
      "Live Coding Sessions",
      "Industry-Standard Projects",
      "Job Placement Assistance",
      "Certificate of Completion",
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course completely transformed my career. I went from knowing basic HTML to building full-stack applications in just a few months!",
        rating: 5,
      },
      {
        name: "Michael Chen",
        image: "/placeholder.svg?height=50&width=50",
        text: "The instructor's teaching style made complex concepts easy to understand. The projects were challenging but extremely rewarding.",
        rating: 4.5,
      },
    ],
  },
  {
    id: "data-science-ai",
    title: "Data Science & AI",
    description: "Explore machine learning, Python, and AI-driven solutions.",
    longDescription:
      "Dive into the world of data science and artificial intelligence with this comprehensive course. You'll learn Python programming, data analysis, visualization techniques, machine learning algorithms, and deep learning frameworks. By the end of the course, you'll be able to build AI models that can analyze data, make predictions, and solve complex problems across various domains.",
    category: "Data Science",
    level: "Advanced",
    price: "$599",
    discountedPrice: "$449",
    duration: "28 weeks",
    batchSize: "25 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.9,
    studentsEnrolled: 9800,
    image: "/placeholder.svg?height=300&width=500",
    instructor: {
      name: "Prof. Vishal Kumar",
      image: "/placeholder.svg?height=100&width=100",
      bio: "AI researcher with publications in top journals and 8+ years of industry experience",
      rating: 4.8,
    },
    curriculum: [
      {
        title: "Module 1: Python for Data Science",
        lessons: [
          "Python Fundamentals",
          "NumPy and Pandas Libraries",
          "Data Cleaning and Preprocessing",
          "Exploratory Data Analysis",
        ],
      },
      {
        title: "Module 2: Data Visualization",
        lessons: [
          "Matplotlib and Seaborn",
          "Interactive Visualizations with Plotly",
          "Dashboard Creation with Dash",
          "Storytelling with Data",
        ],
      },
      {
        title: "Module 3: Machine Learning",
        lessons: [
          "Supervised Learning Algorithms",
          "Unsupervised Learning Techniques",
          "Model Evaluation and Validation",
          "Feature Engineering",
        ],
      },
      {
        title: "Module 4: Deep Learning",
        lessons: [
          "Neural Networks Fundamentals",
          "TensorFlow and Keras",
          "Convolutional Neural Networks",
          "Recurrent Neural Networks",
        ],
      },
      {
        title: "Module 5: AI Applications",
        lessons: [
          "Natural Language Processing",
          "Computer Vision",
          "Reinforcement Learning",
          "Deploying AI Models",
        ],
      },
    ],
    features: [
      "GPU-Enabled Cloud Labs",
      "Real-world Datasets",
      "Kaggle Competition Participation",
      "AI Research Paper Reviews",
      "Industry Mentorship",
    ],
    testimonials: [
      {
        name: "David Wilson",
        image: "/placeholder.svg?height=50&width=50",
        text: "The hands-on approach to machine learning algorithms helped me understand the theory behind them. I'm now confidently building AI models for my company.",
        rating: 5,
      },
      {
        name: "Priya Sharma",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course strikes the perfect balance between theory and practice. The projects are challenging and relevant to real-world problems.",
        rating: 4.8,
      },
    ],
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Learn design principles, prototyping, and user experience strategies.",
    longDescription:
      "Master the art and science of creating beautiful, user-friendly digital experiences. This course covers the entire UI/UX design process, from user research and wireframing to high-fidelity prototypes and usability testing. You'll learn industry-standard tools like Figma and Adobe XD while developing a deep understanding of design principles, color theory, typography, and information architecture.",
    category: "UI/UX Design",
    level: "Beginner",
    price: "$399",
    discountedPrice: "$299",
    duration: "16 weeks",
    batchSize: "20 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.7,
    studentsEnrolled: 7500,
    image: "/placeholder.svg?height=300&width=500",
    instructor: {
      name: "Emma Rodriguez",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Senior UX Designer with experience at top tech companies and a passion for teaching",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Design Fundamentals",
        lessons: [
          "Design Principles and Elements",
          "Color Theory and Psychology",
          "Typography and Readability",
          "Visual Hierarchy and Layout",
        ],
      },
      {
        title: "Module 2: User Research",
        lessons: [
          "User Personas and Scenarios",
          "User Journey Mapping",
          "Competitive Analysis",
          "Usability Testing Methods",
        ],
      },
      {
        title: "Module 3: Wireframing and Prototyping",
        lessons: [
          "Low-Fidelity Wireframes",
          "Interactive Prototyping",
          "Information Architecture",
          "Navigation Patterns",
        ],
      },
      {
        title: "Module 4: UI Design",
        lessons: [
          "Design Systems and Components",
          "Responsive Design",
          "Microinteractions and Animation",
          "Accessibility in Design",
        ],
      },
      {
        title: "Module 5: Professional Practice",
        lessons: [
          "Design Handoff to Developers",
          "Portfolio Development",
          "Design Critique and Iteration",
          "Design Ethics and Inclusivity",
        ],
      },
    ],
    features: [
      "Figma and Adobe XD Licenses",
      "Real Client Projects",
      "Design Review Sessions",
      "Portfolio Development",
      "Design Community Access",
    ],
    testimonials: [
      {
        name: "Alex Thompson",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course helped me transition from graphic design to UI/UX. The instructor's feedback on my projects was invaluable for my growth.",
        rating: 5,
      },
      {
        name: "Sophia Lee",
        image: "/placeholder.svg?height=50&width=50",
        text: "The practical approach to design challenges prepared me for real-world scenarios. I landed a UX design job before even finishing the course!",
        rating: 4.5,
      },
    ],
  },
  {
    id: "cybersecurity-fundamentals",
    title: "Cybersecurity Fundamentals",
    description: "Understand security principles and protect digital assets.",
    longDescription:
      "Develop the skills needed to protect organizations from cyber threats in this comprehensive cybersecurity course. You'll learn about network security, ethical hacking, cryptography, security auditing, and threat analysis. Through hands-on labs and simulated attacks, you'll gain practical experience in identifying vulnerabilities and implementing robust security measures to protect digital assets and sensitive information.",
    category: "Cybersecurity",
    level: "Intermediate",
    price: "$549",
    discountedPrice: "$399",
    duration: "20 weeks",
    batchSize: "25 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.8,
    studentsEnrolled: 6200,
    image: "/placeholder.svg?height=300&width=500",
    instructor: {
      name: "Robert Chen",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Certified Ethical Hacker with 12+ years of experience in cybersecurity consulting",
      rating: 4.7,
    },
    curriculum: [
      {
        title: "Module 1: Security Fundamentals",
        lessons: [
          "Introduction to Cybersecurity",
          "Security Principles and Frameworks",
          "Threat Landscape Overview",
          "Security Governance and Compliance",
        ],
      },
      {
        title: "Module 2: Network Security",
        lessons: [
          "Network Architecture and Vulnerabilities",
          "Firewalls and Intrusion Detection Systems",
          "VPNs and Secure Communications",
          "Wireless Network Security",
        ],
      },
      {
        title: "Module 3: Ethical Hacking",
        lessons: [
          "Reconnaissance Techniques",
          "Vulnerability Assessment",
          "Exploitation Fundamentals",
          "Post-Exploitation and Pivoting",
        ],
      },
      {
        title: "Module 4: Security Operations",
        lessons: [
          "Security Monitoring and SIEM",
          "Incident Response Procedures",
          "Digital Forensics Basics",
          "Threat Hunting Techniques",
        ],
      },
      {
        title: "Module 5: Application Security",
        lessons: [
          "Secure Coding Practices",
          "Web Application Security",
          "Mobile Security Considerations",
          "DevSecOps Integration",
        ],
      },
    ],
    features: [
      "Virtual Security Lab Environment",
      "Capture-the-Flag Challenges",
      "Security Tool Licenses",
      "Industry Certification Preparation",
      "Security Community Membership",
    ],
    testimonials: [
      {
        name: "James Wilson",
        image: "/placeholder.svg?height=50&width=50",
        text: "The hands-on labs were incredibly valuable. I was able to apply what I learned immediately in my IT role to improve our company's security posture.",
        rating: 5,
      },
      {
        name: "Aisha Patel",
        image: "/placeholder.svg?height=50&width=50",
        text: "This course provided a perfect balance of theory and practical skills. The instructor's real-world examples made complex security concepts easier to understand.",
        rating: 4.5,
      },
    ],
  },
  {
    id: "engineering-mathematics",
    title: "Engineering Mathematics",
    description: "Master the mathematical concepts essential for engineering.",
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
    id: "medical-sciences",
    title: "Medical Sciences",
    description:
      "Comprehensive courses for medical students and professionals.",
    longDescription:
      "This comprehensive medical sciences course is designed for students preparing for medical entrance exams and healthcare professionals seeking to refresh their knowledge. Covering anatomy, physiology, biochemistry, pathology, and pharmacology, the course provides a solid foundation in medical sciences. Through detailed illustrations, 3D models, and clinical case studies, you'll develop a deep understanding of human body systems and disease mechanisms.",
    category: "Medical",
    level: "Advanced",
    price: "$649",
    discountedPrice: "$499",
    duration: "32 weeks",
    batchSize: "30 Students",
    validity: "Lifetime Access",
    status: "Live",
    rating: 4.9,
    studentsEnrolled: 5600,
    image: "/placeholder.svg?height=300&width=500",
    instructor: {
      name: "Dr. Priya Singh",
      image: "/placeholder.svg?height=100&width=100",
      bio: "Board-certified physician with 10+ years of clinical and teaching experience",
      rating: 4.9,
    },
    curriculum: [
      {
        title: "Module 1: Human Anatomy",
        lessons: [
          "Musculoskeletal System",
          "Cardiovascular System",
          "Respiratory System",
          "Nervous System",
        ],
      },
      {
        title: "Module 2: Human Physiology",
        lessons: [
          "Cellular Physiology",
          "Cardiovascular Physiology",
          "Respiratory Physiology",
          "Renal Physiology",
        ],
      },
      {
        title: "Module 3: Biochemistry",
        lessons: [
          "Protein Structure and Function",
          "Enzymes and Metabolism",
          "Molecular Biology",
          "Nutrition and Vitamins",
        ],
      },
      {
        title: "Module 4: Pathology",
        lessons: [
          "General Pathology",
          "Cardiovascular Pathology",
          "Respiratory Pathology",
          "Neoplasia",
        ],
      },
      {
        title: "Module 5: Pharmacology",
        lessons: [
          "Pharmacokinetics and Pharmacodynamics",
          "Autonomic Pharmacology",
          "Cardiovascular Pharmacology",
          "Antimicrobial Agents",
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
        text: "Dr. Singh's explanations of complex physiological processes are exceptional. The course structure made it easy to progress through difficult concepts systematically.",
        rating: 4.8,
      },
    ],
  },
];

export { courses, courseCategories, courseLevels };
