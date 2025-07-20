import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET() {
  try {
    const data = await db.select().from(advocates);
    return Response.json({ data });
  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Database connection failed:", error);
    }

    const isConnectionError =
      error.code === "ECONNREFUSED";

    return new Response(
      JSON.stringify({
        error: isConnectionError
          ? "Database connection failed"
          : "Unexpected error",
      }),
      {
        status: isConnectionError ? 503 : 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}