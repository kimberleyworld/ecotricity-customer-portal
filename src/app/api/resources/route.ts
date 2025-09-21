import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.neso.energy/api/3/action/package_show?id=embedded-wind-and-solar-forecasts",
      {
        next: { revalidate: 600 }, // cache for 10 mins then refresh to keep forecast up to date
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Didn't fetch resources" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return NextResponse.json(data.result.resources);
  } catch (error) {
    return NextResponse.json(
      { error: "Server Error" },
      { status: 500 }
    );
  }
}
