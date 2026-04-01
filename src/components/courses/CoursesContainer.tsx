import { prisma } from "@/lib/prisma";
import CourseCard from "./CourseCard";
import { type Course } from "@/types/course";


export default async function CoursesContainer() {
  let courses: Course[] = [];
  try {
    courses = await prisma.course.findMany({
      include: {
        instructor: {
          select: { id: true, name: true, email: true },
        },
        _count: {
          select: { students: true, lessons: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Failed to fetch courses:", error);
  }

  return (
    <div className="w-full p-6 flex items-stretch flex-wrap">
      {courses.length > 0
        ? courses.map((course, idx) => (
          <CourseCard key={course.id || idx} course={course} />
        ))
        : "No courses found"}
    </div>
  );
}
