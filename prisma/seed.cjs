const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const games = [
  { id: "genshin", name: "Genshin Impact", genre: "RPG", rating: "4.7", players: "12.8K", tone: "cover-genshin", badge: "POPULAR", description: "Jelajahi dunia Teyvat, temukan karakter unik, dan mulai petualanganmu." },
  { id: "freefire", name: "Free Fire", genre: "Action", rating: "4.6", players: "18.2K", tone: "cover-fire", badge: "HOT", description: "Bertahan hidup dan jadi yang terakhir di medan pertempuran." },
  { id: "mobilelegends", name: "Mobile Legends", genre: "MOBA", rating: "4.8", players: "22.1K", tone: "cover-ml", badge: "TOP", description: "Bentuk tim, susun strategi, dan menangkan pertandingan." },
  { id: "valorant", name: "VALORANT", genre: "FPS", rating: "4.7", players: "9.4K", tone: "cover-valorant", badge: "TRENDING", description: "Agen dengan kemampuan unik bertemu gameplay taktis." },
  { id: "roblox", name: "Roblox", genre: "Casual", rating: "4.5", players: "7.6K", tone: "cover-roblox", badge: "NEW", description: "Temukan pengalaman seru dan dunia buatan komunitas." },
  { id: "pubg", name: "PUBG Mobile", genre: "Action", rating: "4.6", players: "14.3K", tone: "cover-pubg", badge: "POPULAR", description: "Masuki arena dan berjuang bersama squad." },
  { id: "efootball", name: "eFootball", genre: "Sport", rating: "4.4", players: "5.2K", tone: "cover-sport", badge: "SPORT", description: "Rasakan pertandingan sepak bola bersama tim favorit." },
  { id: "minecraft", name: "Minecraft", genre: "Adventure", rating: "4.8", players: "8.9K", tone: "cover-minecraft", badge: "FAVORITE", description: "Bangun, jelajahi, dan berkreasi tanpa batas." },
];

const categories = ["Semua", "Action", "RPG", "MOBA", "FPS", "Sport", "Casual"];
const servers = ["Asia 1", "Asia 2", "Asia 3", "Asia 4"];
const serverLabels = ["Recommended", "Stable connection", "Alternative server", "Alternative server"];
const topupOptions = ["60 Genesis Crystal", "300 Genesis Crystal", "980 Genesis Crystal", "Blessing of the Welkin Moon"];
const languages = ["Bahasa Indonesia", "English"];

async function main() {
  console.log("Seeding database...");

  // Seed games
  for (const game of games) {
    await prisma.game.upsert({
      where: { id: game.id },
      update: game,
      create: game,
    });
  }
  console.log(`Seeded ${games.length} games`);

  // Seed demo user
  const user = await prisma.user.upsert({
    where: { email: "player@nexplay.app" },
    update: {},
    create: {
      id: "demo-user",
      name: "Player One",
      email: "player@nexplay.app",
      password: "demo-password",
    },
  });
  console.log(`Seeded user: ${user.email}`);

  // Seed demo library
  const libraryGameIds = ["genshin", "freefire", "mobilelegends", "valorant"];
  for (const gameId of libraryGameIds) {
    await prisma.libraryItem.upsert({
      where: { userId_gameId: { userId: user.id, gameId } },
      update: {},
      create: { userId: user.id, gameId },
    });
  }
  console.log(`Seeded ${libraryGameIds.length} library items`);

  // Seed demo wishlist
  const wishlistGameIds = ["minecraft"];
  for (const gameId of wishlistGameIds) {
    await prisma.wishlistItem.upsert({
      where: { userId_gameId: { userId: user.id, gameId } },
      update: {},
      create: { userId: user.id, gameId },
    });
  }
  console.log(`Seeded ${wishlistGameIds.length} wishlist items`);

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
