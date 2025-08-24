import { NextRequest, NextResponse } from "next/server";
import {
  insertAttendence,
  AttendenceDocument,
  searchAttendence,
} from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || undefined;
    const page = Number(searchParams.get("page") || "1");
    const limit = Number(searchParams.get("limit") || "24");
    const data = await searchAttendence({ q, page, limit });
    return NextResponse.json({ ok: true, ...data });
  } catch {
    return NextResponse.json({ ok: false, error: "DB_ERROR" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const attendance = String(body.attendance || "").trim();

    if (!name) {
      return NextResponse.json(
        { ok: false, field: "name", message: "Lütfen ad soyad giriniz." },
        { status: 400 }
      );
    }

    const allowed = ["biga", "tokat", "both", "none"];
    if (!allowed.includes(attendance)) {
      return NextResponse.json(
        {
          ok: false,
          field: "attendance",
          message: "Lütfen bir seçenek seçiniz.",
        },
        { status: 400 }
      );
    }

    const inserted = await insertAttendence({
      name,
      email: email || undefined,
      attendance: attendance as AttendenceDocument["attendance"],
    });
    return NextResponse.json({ ok: true, item: inserted }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, error: "DB_ERROR" }, { status: 500 });
  }
}
