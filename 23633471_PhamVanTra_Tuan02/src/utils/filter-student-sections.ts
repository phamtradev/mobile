import { Student, StudentSection } from '@/data/students';

function normalize(text: string): string {
  return text.trim().toLocaleLowerCase('vi');
}

function matchesQuery(student: Student, normalizedQuery: string): boolean {
  return normalize(`${student.fullName} ${student.studentId} ${student.className}`).includes(normalizedQuery);
}

export function filterStudentSections(sections: StudentSection[], query: string): StudentSection[] {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return sections;

  return sections
    .map((section) => ({
      ...section,
      data: section.data.filter((student) => matchesQuery(student, normalizedQuery)),
    }))
    .filter((section) => section.data.length > 0);
}
