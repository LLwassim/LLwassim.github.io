import { redirect } from "next/navigation";

export default function ResumePage() {
  // Redirect to the PDF in the public folder
  redirect("/resume.pdf");
}

