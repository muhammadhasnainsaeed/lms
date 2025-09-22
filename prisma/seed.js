import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  // Create an Instructor
  const instructor = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@example.com",
      password: "hashedpassword123", // later hash with bcrypt
      role: "INSTRUCTOR",
    },
  });

  // Create a Student
  const student = await prisma.user.create({
    data: {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "hashedpassword123",
      role: "STUDENT",
    },
  });

  // Create a Course
  const course = await prisma.course.create({
    data: {
      title: "Fullstack Web Development",
      description:
        "Learn Next.js, Prisma, and PostgreSQL with hands-on projects.",
      content: "This is the course content outline.",
      imageUrl: "https://placehold.co/600x400",
      instructorId: instructor.id,
    },
  });

  // Create Lessons
  const lesson1 = await prisma.lesson.create({
    data: {
      title: "Introduction to Next.js",
      content: "Learn the basics of Next.js.",
      order: 1,
      courseId: course.id,
    },
  });

  const lesson2 = await prisma.lesson.create({
    data: {
      title: "Database with Prisma",
      content: "Setting up PostgreSQL and Prisma ORM.",
      order: 2,
      courseId: course.id,
    },
  });

  // Create Videos for Lesson 1
  await prisma.video.createMany({
    data: [
      {
        title: "What is Next.js?",
        url: "https://example.com/videos/nextjs-intro",
        duration: 300,
        lessonId: lesson1.id,
      },
      {
        title: "Setting up a Next.js project",
        url: "https://example.com/videos/nextjs-setup",
        duration: 420,
        lessonId: lesson1.id,
      },
    ],
  });

  // Create Videos for Lesson 2
  await prisma.video.createMany({
    data: [
      {
        title: "Installing PostgreSQL",
        url: "https://example.com/videos/postgres-install",
        duration: 480,
        lessonId: lesson2.id,
      },
      {
        title: "Using Prisma Migrate",
        url: "https://example.com/videos/prisma-migrate",
        duration: 360,
        lessonId: lesson2.id,
      },
    ],
  });

  // Enroll Student in Course
  await prisma.courseEnrollment.create({
    data: {
      userId: student.id,
      courseId: course.id,
    },
  });

  console.log("✅ Dummy data inserted!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
