import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const DEMO_USER_ID = "demo-user";

export async function GET() {
  try {
    const items = await prisma.libraryItem.findMany({
      where: { userId: DEMO_USER_ID },
      include: { game: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items.map((item) => item.game));
  } catch (error) {
    console.error("Failed to fetch library:", error);
    return NextResponse.json(
      { error: "Failed to fetch library" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { gameId } = await request.json();

    if (!gameId) {
      return NextResponse.json({ error: "gameId is required" }, { status: 400 });
    }

    const item = await prisma.libraryItem.upsert({
      where: { userId_gameId: { userId: DEMO_USER_ID, gameId } },
      update: {},
      create: { userId: DEMO_USER_ID, gameId },
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error("Failed to add to library:", error);
    return NextResponse.json(
      { error: "Failed to add to library" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { gameId } = await request.json();

    if (!gameId) {
      return NextResponse.json({ error: "gameId is required" }, { status: 400 });
    }

    await prisma.libraryItem.deleteMany({
      where: { userId: DEMO_USER_ID, gameId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to remove from library:", error);
    return NextResponse.json(
      { error: "Failed to remove from library" },
      { status: 500 }
    );
  }
}
