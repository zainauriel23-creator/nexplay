import type { Game } from "./types";

// Static fallback data used when database is unavailable
export const games: Game[] = [
  { id: "genshin", name: "Genshin Impact", genre: "RPG", rating: "4.7", players: "12.8K", tone: "cover-genshin", badge: "POPULAR", description: "Jelajahi dunia Teyvat, temukan karakter unik, dan mulai petualanganmu." },
  { id: "freefire", name: "Free Fire", genre: "Action", rating: "4.6", players: "18.2K", tone: "cover-fire", badge: "HOT", description: "Bertahan hidup dan jadi yang terakhir di medan pertempuran." },
  { id: "mobilelegends", name: "Mobile Legends", genre: "MOBA", rating: "4.8", players: "22.1K", tone: "cover-ml", badge: "TOP", description: "Bentuk tim, susun strategi, dan menangkan pertandingan." },
  { id: "valorant", name: "VALORANT", genre: "FPS", rating: "4.7", players: "9.4K", tone: "cover-valorant", badge: "TRENDING", description: "Agen dengan kemampuan unik bertemu gameplay taktis." },
  { id: "roblox", name: "Roblox", genre: "Casual", rating: "4.5", players: "7.6K", tone: "cover-roblox", badge: "NEW", description: "Temukan pengalaman seru dan dunia buatan komunitas." },
  { id: "pubg", name: "PUBG Mobile", genre: "Action", rating: "4.6", players: "14.3K", tone: "cover-pubg", badge: "POPULAR", description: "Masuki arena dan berjuang bersama squad." },
  { id: "efootball", name: "eFootball", genre: "Sport", rating: "4.4", players: "5.2K", tone: "cover-sport", badge: "SPORT", description: "Rasakan pertandingan sepak bola bersama tim favorit." },
  { id: "minecraft", name: "Minecraft", genre: "Adventure", rating: "4.8", players: "8.9K", tone: "cover-minecraft", badge: "FAVORITE", description: "Bangun, jelajahi, dan berkreasi tanpa batas." },
];
