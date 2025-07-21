import { sql, eq, and, or, ilike, asc, desc } from "drizzle-orm";
import db from "../../../db";
import { advocates } from "../../../db/schema";

export async function GET(request: Request) {

  if (!process.env.DATABASE_URL) {
    return new Response(
      JSON.stringify({ error: "DATABASE_URL environment variable is not set" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
  
  try {
    const { searchParams } = new URL(request.url);

    // Pagination and Sorting
    const page = parseInt(searchParams.get("page") || "1", 10);
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10);
    const offset = (page - 1) * pageSize;
    const sortBy = searchParams.get("sortBy") || "id";
    const sortOrder = searchParams.get("sortOrder") === "desc" ? desc : asc;

    // Filtering
    const filter = searchParams.get("filter")?.trim();
    const conditions = [];

    if (filter) {
      conditions.push(
        or(
          ilike(advocates.firstName, `%${filter}%`),
          ilike(advocates.lastName, `%${filter}%`),
          ilike(advocates.city, `%${filter}%`),
          ilike(advocates.degree, `%${filter}%`),
          ilike(sql`payload::text`, `%${filter}%`)
        )
      );
    }

    // Base query
    const query = db.select().from(advocates);
    if (conditions.length > 0) {
      query.where(and(...conditions));
    }

    const data = await query
      .orderBy(sortOrder(advocates[sortBy]))
      .limit(pageSize)
      .offset(offset);

    // Filtered count
    const totalQuery = db
      .select({ count: sql`count(*)` })
      .from(advocates);

    if (conditions.length > 0) {
      totalQuery.where(and(...conditions));
    }

    const total = await totalQuery.then((res) => Number(res[0].count));

    return Response.json({
      data,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });

  } catch (error: any) {
    if (process.env.NODE_ENV === "development") {
      console.error("Database connection failed:", error);
    }

    const isConnectionError = error.code === "ECONNREFUSED";

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
