import { useState } from "react";
import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";
import type { Enrollment } from "@/lib/types";

export default function Enrollent() {
  const [myEnrollments, setMyEnrollments] = useState<Enrollment[]>(
    enrollments.filter((e) => e.studentId === currentStudent.studentId),
  );

  const isEnrolled = (courseId: string) =>
    myEnrollments.some((e) => e.courseId === courseId);

  const getEnrolledAt = (courseId: string) =>
    myEnrollments.find((e) => e.courseId === courseId)?.enrolledAt;

  const availableCourses = courses.filter((c) => !isEnrolled(c.courseId));

  function handleEnroll(courseId: string, enrolledAt: string) {
    setMyEnrollments((prev) => [
      ...prev,
      { studentId: currentStudent.studentId, courseId, enrolledAt },
    ]);
  }

  function handleUnenroll(courseId: string) {
    setMyEnrollments((prev) => prev.filter((e) => e.courseId !== courseId));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <p className="text-sm text-muted-foreground">
            {currentStudent.firstName} {currentStudent.lastName} (
            {currentStudent.studentId})
          </p>
        </div>
        <RegisterDialog
          availableCourses={availableCourses}
          onEnroll={handleEnroll}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            course={course}
            student={currentStudent}
            isEnrolled={isEnrolled(course.courseId)}
            enrolledAt={getEnrolledAt(course.courseId)}
            onUnenroll={handleUnenroll}
          />
        ))}
      </div>
    </div>
  );
}
