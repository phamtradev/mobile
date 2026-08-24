import { Course } from '@/data/courses';

function normalize(text: string): string {
  return text.trim().toLocaleLowerCase('vi');
}

export function filterCourses(courses: Course[], query: string): Course[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return courses;

  return courses.filter((course) =>
    normalize(`${course.title} ${course.instructor} ${course.category}`).includes(normalizedQuery),
  );
}
