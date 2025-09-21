import Link from "next/link";
import React from "react";

export default function dashboard() {
  return (
    <div>
      dashboard <br />
      <Link href="dashboard/courses">courses</Link>
    </div>
  );
}
