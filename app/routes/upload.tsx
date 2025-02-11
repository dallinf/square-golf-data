import { ActionFunction, redirect } from "@remix-run/node";
import { promises as fs } from "fs";
import path from "path";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const file = formData.get("csvFile") as File;

  if (!file) {
    return redirect("/?error=No file uploaded");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = file.name;

  // Ensure filename contains _DR_ and ends with .csv
  if (!filename.includes("_DR_") || !filename.endsWith(".csv")) {
    return redirect("/?error=Invalid file format");
  }

  // Save file to data directory
  const dataDir = path.join(process.cwd(), "data");
  await fs.writeFile(path.join(dataDir, filename), buffer);

  return redirect("/");
};
