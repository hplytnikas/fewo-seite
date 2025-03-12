import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/app/lib/emailTemplate"; // Adjust the path if needed

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received request body:", body); // Debugging

    const { email, lastname, message, name, people, petList, pets } = body;

    const startDate = body?.startDate || body["startDate"];
    const endDate = body?.endDate || body["endDate"];

    console.log("Start Date: ", startDate);
    console.log("End Date: ", endDate);

    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: ["h.plytnikas@gmail.com"],
      subject: "Neue Anfrage",
      react: await EmailTemplate({
        email, lastname, message, name, people, petList, pets, startDate, endDate
      }),
    });

    if (error) {
      console.error("Resend API Error:", error); // Debugging
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Unexpected Error:", error); // Debugging
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
