const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...\n");

  // Clean existing data (in reverse order of dependencies)
  await prisma.video.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.courseEnrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();
  console.log("🗑️  Cleared existing data\n");

  // Hash passwords
  const hashedPassword = await bcrypt.hash("password123", 10);

  // ── Users ──────────────────────────────────────────────────
  const admin = await prisma.user.create({
    data: {
      name: "Hasnain Saeed",
      email: "admin@lms.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  const instructor1 = await prisma.user.create({
    data: {
      name: "Dr. Sarah Ahmed",
      email: "sarah@lms.com",
      password: hashedPassword,
      role: "INSTRUCTOR",
    },
  });

  const instructor2 = await prisma.user.create({
    data: {
      name: "Prof. Ali Khan",
      email: "ali@lms.com",
      password: hashedPassword,
      role: "INSTRUCTOR",
    },
  });

  const instructor3 = await prisma.user.create({
    data: {
      name: "Ms. Fatima Noor",
      email: "fatima@lms.com",
      password: hashedPassword,
      role: "INSTRUCTOR",
    },
  });

  const student1 = await prisma.user.create({
    data: {
      name: "Ahmed Raza",
      email: "ahmed@student.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Zara Malik",
      email: "zara@student.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  const student3 = await prisma.user.create({
    data: {
      name: "Usman Tariq",
      email: "usman@student.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  const student4 = await prisma.user.create({
    data: {
      name: "Ayesha Siddiqui",
      email: "ayesha@student.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  const student5 = await prisma.user.create({
    data: {
      name: "Bilal Hussain",
      email: "bilal@student.com",
      password: hashedPassword,
      role: "STUDENT",
    },
  });

  console.log("👤 Created 9 users (1 admin, 3 instructors, 5 students)\n");

  // ── Courses ────────────────────────────────────────────────
  const course1 = await prisma.course.create({
    data: {
      title: "Full-Stack Web Development with Next.js",
      description:
        "Master modern full-stack development using Next.js 15, React 19, Prisma, and PostgreSQL. Build production-ready applications from scratch.",
      content:
        "This comprehensive course covers everything from React fundamentals to deploying full-stack applications. You will learn server components, API routes, authentication, database management, and much more.",
      imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479",
      instructorId: instructor1.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: "Python for Data Science & Machine Learning",
      description:
        "Learn Python programming, data analysis with Pandas, visualization with Matplotlib, and machine learning with Scikit-learn.",
      content:
        "From Python basics to advanced machine learning algorithms. Includes hands-on projects with real-world datasets, covering regression, classification, clustering, and neural networks.",
      imageUrl: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
      instructorId: instructor2.id,
    },
  });

  const course3 = await prisma.course.create({
    data: {
      title: "UI/UX Design Fundamentals",
      description:
        "Learn the principles of user interface and user experience design. Master Figma, prototyping, and design systems.",
      content:
        "A complete guide to modern UI/UX design covering wireframing, prototyping, user research, accessibility, and building scalable design systems from scratch.",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
      instructorId: instructor3.id,
    },
  });

  const course4 = await prisma.course.create({
    data: {
      title: "Advanced TypeScript & Design Patterns",
      description:
        "Deep dive into TypeScript's type system, generics, decorators, and software design patterns for scalable applications.",
      content:
        "Go beyond the basics of TypeScript. Learn advanced type manipulation, conditional types, mapped types, and implement Gang of Four design patterns in real-world TypeScript projects.",
      imageUrl: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
      instructorId: instructor1.id,
    },
  });

  const course5 = await prisma.course.create({
    data: {
      title: "Mobile App Development with React Native",
      description:
        "Build cross-platform mobile applications for iOS and Android using React Native and Expo.",
      content:
        "Learn to build beautiful, performant mobile apps. Covers navigation, state management, native APIs, push notifications, and app store deployment.",
      imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c",
      instructorId: instructor2.id,
    },
  });

  const course6 = await prisma.course.create({
    data: {
      title: "DevOps & Cloud Infrastructure with AWS",
      description:
        "Master CI/CD pipelines, Docker, Kubernetes, and AWS services for modern cloud infrastructure.",
      content:
        "From version control to production deployment. Learn Docker containerization, Kubernetes orchestration, AWS services (EC2, S3, Lambda, RDS), and infrastructure as code with Terraform.",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
      instructorId: instructor3.id,
    },
  });

  console.log("📚 Created 6 courses\n");

  // ── Lessons ────────────────────────────────────────────────

  // Course 1: Full-Stack Web Development
  const c1Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Introduction to Next.js & Project Setup",
        content:
          "Set up your development environment, create a new Next.js project, and understand the folder structure and routing system.",
        courseId: course1.id,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "React Server Components & Client Components",
        content:
          "Understand the difference between server and client components, when to use each, and how data flows between them.",
        courseId: course1.id,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Database Setup with Prisma & PostgreSQL",
        content:
          "Configure Prisma ORM, create your schema, run migrations, and perform CRUD operations on a PostgreSQL database.",
        courseId: course1.id,
        order: 3,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Authentication & Authorization",
        content:
          "Implement user authentication with JWT, password hashing with bcrypt, and role-based authorization.",
        courseId: course1.id,
        order: 4,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Building RESTful API Routes",
        content:
          "Create API endpoints using Next.js route handlers, implement error handling, and validate request data with Zod.",
        courseId: course1.id,
        order: 5,
      },
    }),
  ]);

  // Course 2: Python for Data Science
  const c2Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Python Fundamentals & Environment Setup",
        content:
          "Install Python, set up Jupyter notebooks, and learn core Python syntax including variables, loops, and functions.",
        courseId: course2.id,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Data Manipulation with Pandas",
        content:
          "Master DataFrames, Series, data cleaning, filtering, grouping, and merging datasets with Pandas.",
        courseId: course2.id,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Data Visualization with Matplotlib & Seaborn",
        content:
          "Create compelling charts, plots, and dashboards to communicate data insights effectively.",
        courseId: course2.id,
        order: 3,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Machine Learning with Scikit-learn",
        content:
          "Implement regression, classification, and clustering algorithms. Learn model evaluation and hyperparameter tuning.",
        courseId: course2.id,
        order: 4,
      },
    }),
  ]);

  // Course 3: UI/UX Design
  const c3Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Design Thinking & User Research",
        content:
          "Learn the design thinking framework, conduct user interviews, create personas, and map user journeys.",
        courseId: course3.id,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Wireframing & Prototyping in Figma",
        content:
          "Create low-fidelity wireframes and interactive prototypes using Figma's powerful design tools.",
        courseId: course3.id,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Visual Design Principles",
        content:
          "Master typography, color theory, spacing, hierarchy, and layout principles for stunning interfaces.",
        courseId: course3.id,
        order: 3,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Building a Design System",
        content:
          "Create reusable components, define design tokens, and build a scalable design system from scratch.",
        courseId: course3.id,
        order: 4,
      },
    }),
  ]);

  // Course 4: Advanced TypeScript
  const c4Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Advanced Type System Deep Dive",
        content:
          "Explore conditional types, mapped types, template literal types, and type inference techniques.",
        courseId: course4.id,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Generics & Utility Types",
        content:
          "Master generic functions, classes, and constraints. Build custom utility types for real-world use cases.",
        courseId: course4.id,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Design Patterns in TypeScript",
        content:
          "Implement Singleton, Factory, Observer, Strategy, and Decorator patterns with practical examples.",
        courseId: course4.id,
        order: 3,
      },
    }),
  ]);

  // Course 5: React Native
  const c5Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Getting Started with React Native & Expo",
        content:
          "Set up your mobile development environment, create your first app, and understand the React Native architecture.",
        courseId: course5.id,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "Navigation & Routing",
        content:
          "Implement stack, tab, and drawer navigation patterns using React Navigation library.",
        courseId: course5.id,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "State Management & API Integration",
        content:
          "Manage app state with Context API and Zustand, and connect to REST APIs for data fetching.",
        courseId: course5.id,
        order: 3,
      },
    }),
  ]);

  // Course 6: DevOps
  const c6Lessons = await Promise.all([
    prisma.lesson.create({
      data: {
        title: "Docker Fundamentals",
        content:
          "Understand containers, create Dockerfiles, manage images, and use Docker Compose for multi-service applications.",
        courseId: course6.id,
        order: 1,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "CI/CD Pipelines with GitHub Actions",
        content:
          "Automate testing, building, and deployment workflows using GitHub Actions and best practices.",
        courseId: course6.id,
        order: 2,
      },
    }),
    prisma.lesson.create({
      data: {
        title: "AWS Cloud Services Overview",
        content:
          "Navigate AWS console, set up EC2 instances, S3 buckets, Lambda functions, and RDS databases.",
        courseId: course6.id,
        order: 3,
      },
    }),
  ]);

  console.log("📖 Created 22 lessons across all courses\n");

  // ── Videos ─────────────────────────────────────────────────
  const videoData = [
    // Course 1 videos
    { title: "Welcome & Course Overview", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 480, lessonId: c1Lessons[0].id },
    { title: "Installing Node.js & VS Code", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 720, lessonId: c1Lessons[0].id },
    { title: "Creating Your First Next.js App", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 900, lessonId: c1Lessons[0].id },
    { title: "Server Components Explained", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1200, lessonId: c1Lessons[1].id },
    { title: "Client Components & Interactivity", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1080, lessonId: c1Lessons[1].id },
    { title: "Prisma Schema & Migrations", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1500, lessonId: c1Lessons[2].id },
    { title: "CRUD Operations with Prisma", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1320, lessonId: c1Lessons[2].id },
    { title: "JWT Authentication Setup", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1800, lessonId: c1Lessons[3].id },
    { title: "Role-Based Access Control", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1440, lessonId: c1Lessons[3].id },
    { title: "Building REST APIs in Next.js", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1620, lessonId: c1Lessons[4].id },

    // Course 2 videos
    { title: "Python Installation & Jupyter Setup", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 600, lessonId: c2Lessons[0].id },
    { title: "Variables, Data Types & Control Flow", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 900, lessonId: c2Lessons[0].id },
    { title: "Introduction to Pandas DataFrames", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1200, lessonId: c2Lessons[1].id },
    { title: "Data Cleaning Techniques", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1080, lessonId: c2Lessons[1].id },
    { title: "Creating Charts with Matplotlib", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1320, lessonId: c2Lessons[2].id },
    { title: "Statistical Plots with Seaborn", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 960, lessonId: c2Lessons[2].id },
    { title: "Linear Regression from Scratch", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1500, lessonId: c2Lessons[3].id },
    { title: "Classification with Random Forest", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1380, lessonId: c2Lessons[3].id },

    // Course 3 videos
    { title: "What is Design Thinking?", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 720, lessonId: c3Lessons[0].id },
    { title: "Conducting User Interviews", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 840, lessonId: c3Lessons[0].id },
    { title: "Figma Interface Walkthrough", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1080, lessonId: c3Lessons[1].id },
    { title: "Creating Interactive Prototypes", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1200, lessonId: c3Lessons[1].id },
    { title: "Typography & Color Theory", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 960, lessonId: c3Lessons[2].id },
    { title: "Building Reusable Components", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1440, lessonId: c3Lessons[3].id },

    // Course 4 videos
    { title: "Conditional & Mapped Types", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1500, lessonId: c4Lessons[0].id },
    { title: "Template Literal Types", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1080, lessonId: c4Lessons[0].id },
    { title: "Generic Constraints & Defaults", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1200, lessonId: c4Lessons[1].id },
    { title: "Singleton & Factory Patterns", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1380, lessonId: c4Lessons[2].id },
    { title: "Observer & Strategy Patterns", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1260, lessonId: c4Lessons[2].id },

    // Course 5 videos
    { title: "Expo Setup & First App", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 900, lessonId: c5Lessons[0].id },
    { title: "React Native Core Components", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1080, lessonId: c5Lessons[0].id },
    { title: "Stack & Tab Navigation", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1200, lessonId: c5Lessons[1].id },
    { title: "Zustand State Management", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1320, lessonId: c5Lessons[2].id },

    // Course 6 videos
    { title: "Docker Containers Explained", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1080, lessonId: c6Lessons[0].id },
    { title: "Writing Dockerfiles", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1200, lessonId: c6Lessons[0].id },
    { title: "GitHub Actions Workflow", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1380, lessonId: c6Lessons[1].id },
    { title: "Deploying to AWS EC2", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1500, lessonId: c6Lessons[2].id },
    { title: "S3 & Lambda Functions", url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", duration: 1260, lessonId: c6Lessons[2].id },
  ];

  await prisma.video.createMany({ data: videoData });
  console.log(`🎬 Created ${videoData.length} videos\n`);

  // ── Course Enrollments ─────────────────────────────────────
  const enrollments = [
    // Ahmed is enrolled in 3 courses
    { userId: student1.id, courseId: course1.id },
    { userId: student1.id, courseId: course2.id },
    { userId: student1.id, courseId: course4.id },
    // Zara is enrolled in 2 courses
    { userId: student2.id, courseId: course1.id },
    { userId: student2.id, courseId: course3.id },
    // Usman is enrolled in 3 courses
    { userId: student3.id, courseId: course2.id },
    { userId: student3.id, courseId: course5.id },
    { userId: student3.id, courseId: course6.id },
    // Ayesha is enrolled in 2 courses
    { userId: student4.id, courseId: course3.id },
    { userId: student4.id, courseId: course4.id },
    // Bilal is enrolled in 4 courses
    { userId: student5.id, courseId: course1.id },
    { userId: student5.id, courseId: course2.id },
    { userId: student5.id, courseId: course5.id },
    { userId: student5.id, courseId: course6.id },
  ];

  await prisma.courseEnrollment.createMany({ data: enrollments });
  console.log(`📝 Created ${enrollments.length} course enrollments\n`);

  // ── Summary ────────────────────────────────────────────────
  console.log("✅ Seed completed successfully!");
  console.log("─".repeat(40));
  console.log("📊 Summary:");
  console.log("   • 1 Admin (admin@lms.com)");
  console.log("   • 3 Instructors");
  console.log("   • 5 Students");
  console.log("   • 6 Courses");
  console.log("   • 22 Lessons");
  console.log(`   • ${videoData.length} Videos`);
  console.log(`   • ${enrollments.length} Enrollments`);
  console.log("─".repeat(40));
  console.log("🔑 All passwords: password123");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
