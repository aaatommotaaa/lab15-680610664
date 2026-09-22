import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

type CourseCardProps = {
  course: Course;
  student: Student;
  isEnrolled: boolean;
  enrolledAt?: string;
  onUnenroll: (courseId: string) => void;
};

export function CourseCard({
  course,
  student,
  isEnrolled,
  enrolledAt,
  onUnenroll,
}: CourseCardProps) {
  const formattedDate = enrolledAt
    ? new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(enrolledAt))
    : "";

  return (
    <Card>
      <CardHeader className="flex items-start justify-between gap-2">
        <div>
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
            {course.instructors.join(", ")}
          </CardDescription>
        </div>

        <Badge
          className={
            isEnrolled
              ? "bg-amber-100 text-amber-900 dark:bg-purple-900/50 dark:text-purple-200"
              : "bg-purple-100 text-purple-900 dark:bg-amber-900/50 dark:text-amber-200"
          }
        >
          {isEnrolled ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
        </Badge>
      </CardHeader>

      {isEnrolled && (
        <CardContent className="flex items-end justify-between">
          <div className="text-xs text-muted-foreground">
            <p>
              ชื่อ นศ.: {student.firstName} {student.lastName}
            </p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formattedDate}</p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="ยกเลิกการลงทะเบียน"
            onClick={() => onUnenroll(course.courseId)}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
