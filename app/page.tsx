"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft, Bell, Check, ChevronRight, CircleHelp, Clock3, Compass,
  Gamepad2, Globe2, Heart, Home, Info, LibraryBig, LogOut, Play,
  Search, Settings, ShieldCheck, Star, UserRound, Wallet, X, Zap,
} from "lucide-react";

import { Cover } from "@/components/Cover";
import { Empty } from "@/components/Empty";
import { GameCard } from "@/components/GameCard";
import { LibraryRow } from "@/components/LibraryRow";
import { PageHeading } from "@/components/PageHeading";
import { SubPage } from "@/components/SubPage";
import {
  categories, faqEntries, languages, servers, serverLabels, topupOptions,
} from "@/lib/data";
import type { Game, Page } from "@/lib/types";

export default function NexPlay() {
  const [page, setPage] = useState<Page>("home");
  const [previousPage, setPreviousPage] = useState<Page>("home");
  const [games, setGames] = useState<Game[]>([]);
  const [selected, setSelected] = useState<Game | null>(null);
  const [category, setCategory] = useState("Semua");
  const [query, setQuery] = useState("");
  const [server, setServer] = useState("");
  const [tab, setTab] = useState<"mine" | "wishlist">("mine");
  const [mine, setMine] = useState<string[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [language, setLanguage] = useState("Bahasa Indonesia");
  const [topupAmount, setTopupAmount] = useState(topupOptions[0]);
  const [accountId, setAccountId] = useState("");
  const [showLogout, setShowLogout] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [loading, setLoading] = useState(true);

  // -- Loading screen animation --
  useEffect(() => {
    if (page !== "loading") return;
    setLoadingStep(0);
    const a = window.setTimeout(() => setLoadingStep(1), 650);
    const b = window.setTimeout(() => setLoadingStep(2), 1350);
    const c = window.setTimeout(() => setPage("onboarding"), 2100);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
      window.clearTimeout(c);
    };
  }, [page]);

  // -- Fetch data from API on mount --
  useEffect(() => {
    async function fetchData() {
      try {
        const [gamesRes, libraryRes, wishlistRes] = await Promise.all([
          fetch("/api/games"),
          fetch("/api/library"),
          fetch("/api/wishlist"),
        ]);
        const gamesData: Game[] = await gamesRes.json();
        const libraryData: Game[] = await libraryRes.json();
        const wishlistData: Game[] = await wishlistRes.json();
        setGames(gamesData);
        if (gamesData.length > 0) setSelected(gamesData[0]);
        setMine(libraryData.map((g) => g.id));
        setWishlist(wishlistData.map((g) => g.id));
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filtered = useMemo(
    () =>
      games.filter(
        (g) =>
          (category === "Semua" || g.genre === category) &&
          g.name.toLowerCase().includes(query.toLowerCase())
      ),
    [games, category, query]
  );

  function openGame(game: Game) {
    setSelected(game);
    setPreviousPage(page);
    setPage("detail");
  }

  function back() {
    setPage(previousPage);
  }

  function toast(message: string) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 2600);
  }

  async function toggleWishlist(id: string) {
    const removing = wishlist.includes(id);
    setWishlist((old) =>
      removing ? old.filter((x) => x !== id) : [...old, id]
    );
    toast(removing ? "Dihapus dari Wishlist" : "Ditambahkan ke Wishlist");
    try {
      await fetch("/api/wishlist", {
        method: removing ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gameId: id }),
      });
    } catch (error) {
      console.error("Wishlist API error:", error);
    }
  }

  function nav(target: Page) {
    setPage(target);
    setQuery("");
    setCategory("Semua");
  }

  function goToCategory(cat: string) {
    setCategory(cat);
    setQuery("");
    setPage("explore");
  }

  function launch() {
    if (!server) {
      toast("Pilih server dulu, bos.");
      return;
    }
    setPage("loading");
  }

  const selectedInWishlist = selected ? wishlist.includes(selected.id) : false;
  const isMain = ["home", "explore", "library", "profile"].includes(page);

  // -- Loading data screen (must be before all other screens for type safety) --
  if (loading || !selected)
    return (
      <main className="launch-screen">
        <div className="launch-logo"><Gamepad2 size={36} /></div>
        <h1>Nex<span>Play</span></h1>
        <div className="loader"><i /></div>
        <small>Memuat data game…</small>
      </main>
    );

  // -- Loading screen --
  if (page === "loading")
    return (
      <main className="launch-screen">
        <div className="launch-logo"><Gamepad2 size={36} /></div>
        <h1>Nex<span>Play</span></h1>
        <p>
          {["Menyiapkan sesi permainan…", `Menghubungkan ke server ${server}…`, "Hampir siap…"][loadingStep]}
        </p>
        <div className="loader"><i /></div>
        <small>Pengalaman instant play • Demo prototype</small>
      </main>
    );

  // -- Onboarding screen --
  if (page === "onboarding")
    return (
      <main className="game-onboarding">
        <div className="game-scene">
          <div className="scene-top">
            <span className="brand-pill">NEXPLAY CLOUD</span>
            <span className="server-pill">{server}</span>
          </div>
          <div className="scene-content">
            <p className="eyebrow">YOUR NEXT ADVENTURE STARTS HERE</p>
            <h1>{selected.name}</h1>
            <p>{selected.description}</p>
            <button className="primary start-button" onClick={() => setPage("playing")}>
              <Play size={17} fill="currentColor" /> Main Sekarang
            </button>
            <span className="no-download">
              <Check size={14} /> Tidak perlu download manual
            </span>
          </div>
        </div>
        <button className="back-floating" onClick={() => setPage("detail")}>
          <ArrowLeft size={18} /> Kembali
        </button>
      </main>
    );

  // -- Playing screen --
  if (page === "playing")
    return (
      <main className="playing-screen">
        <div className="playing-card">
          <div className="launch-logo"><Gamepad2 size={34} /></div>
          <span className="eyebrow">NEXPLAY SESSION</span>
          <h1>{selected.name}</h1>
          <p>Sesi demo berhasil dimulai di <b>{server}</b>.</p>
          <div className="session-info">
            <span><ShieldCheck size={16} /> Session connected</span>
            <span><Clock3 size={16} /> Demo mode</span>
          </div>
          <p className="muted">
            Ini simulasi tampilan. Untuk memainkan game sungguhan, NexPlay perlu integrasi
            layanan cloud gaming resmi.
          </p>
          <button className="primary" onClick={() => nav("home")}>Kembali ke Home</button>
        </div>
      </main>
    );

  // -- Main app shell --
  const settingsItems: { icon: typeof Settings; label: string; target: Page }[] = [
    { icon: Settings, label: "Pengaturan Akun", target: "account" },
    { icon: Bell, label: "Notifikasi", target: "notifications" },
    { icon: Globe2, label: "Bahasa", target: "language" },
    { icon: Info, label: "Tentang NexPlay", target: "about" },
    { icon: CircleHelp, label: "Bantuan & FAQ", target: "faq" },
  ];

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon"><Gamepad2 size={20} /></div>
          <span>Nex<span>Play</span></span>
        </div>
        <div className="side-label">MENU</div>
        <button className={page === "home" ? "side-link active" : "side-link"} onClick={() => nav("home")}>
          <Home size={18} /> Home
        </button>
        <button className={page === "explore" ? "side-link active" : "side-link"} onClick={() => nav("explore")}>
          <Compass size={18} /> Explore
        </button>
        <button className={page === "library" ? "side-link active" : "side-link"} onClick={() => nav("library")}>
          <LibraryBig size={18} /> Library
        </button>
        <button className={page === "profile" ? "side-link active" : "side-link"} onClick={() => nav("profile")}>
          <UserRound size={18} /> Profile
        </button>
        <div className="sidebar-bottom">
          <div className="promo-mini">
            <Zap size={17} />
            <b>Play without waiting</b>
            <small>Discover your next game.</small>
          </div>
          <span className="muted tiny">NexPlay • Prototype v1.0</span>
        </div>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <div>
            <span className="muted">Welcome back,</span>
            <b> Player 👋</b>
          </div>
          <button className="icon-button" aria-label="Notifikasi" onClick={() => nav("notifications")}>
            <Bell size={19} />
            <i />
          </button>
        </header>

        <div className="content">
          {/* ── Home ── */}
          {page === "home" && (
            <>
              <section className="hero">
                <div className="hero-copy">
                  <span className="eyebrow">LEVEL UP YOUR PLAY</span>
                  <h1>Game favoritmu,<br /><em>lebih dekat.</em></h1>
                  <p>Temukan game seru dan mulai petualanganmu bersama NexPlay.</p>
                  <button className="primary" onClick={() => nav("explore")}>
                    Explore Game <ChevronRight size={17} />
                  </button>
                </div>
                <div className="hero-orb">
                  <Gamepad2 size={76} />
                  <span>PLAY<br />NOW</span>
                </div>
                <div className="hero-glow" />
              </section>

              <section className="section">
                <div className="section-head">
                  <div>
                    <span className="eyebrow">DISCOVER</span>
                    <h2>Kategori</h2>
                  </div>
                  <button className="text-button" onClick={() => nav("explore")}>
                    Lihat semua <ChevronRight size={15} />
                  </button>
                </div>
                <div className="category-row">
                  {categories.slice(1).map((c, i) => (
                    <button key={c} className="category-chip" onClick={() => goToCategory(c)}>
                      <span>{["⚔️", "✨", "🛡️", "🎯", "⚽", "🎮"][i]}</span>
                      {c}
                    </button>
                  ))}
                </div>
              </section>

              <section className="section">
                <div className="section-head">
                  <div>
                    <span className="eyebrow">MOST PLAYED</span>
                    <h2>Game Populer</h2>
                  </div>
                  <button className="text-button" onClick={() => nav("explore")}>
                    Lihat semua <ChevronRight size={15} />
                  </button>
                </div>
                <div className="game-grid">
                  {games.slice(0, 4).map((g) => (
                    <GameCard key={g.id} game={g} onClick={() => openGame(g)} />
                  ))}
                </div>
              </section>
            </>
          )}

          {/* ── Explore ── */}
          {page === "explore" && (
            <>
              <PageHeading
                eyebrow="FIND YOUR NEXT GAME"
                title="Explore Game"
                subtitle="Cari game favorit dan temukan petualangan baru."
              />
              <div className="search-box">
                <Search size={18} />
                <input
                  placeholder="Cari nama game..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                  <button onClick={() => setQuery("")}>
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="filter-row">
                {categories.map((c) => (
                  <button
                    key={c}
                    className={category === c ? "filter active" : "filter"}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="game-grid">
                {filtered.map((g) => (
                  <GameCard key={g.id} game={g} onClick={() => openGame(g)} />
                ))}
              </div>
              {filtered.length === 0 && (
                <Empty title="Game nggak ditemukan" text="Coba kata kunci atau kategori lain, ya." />
              )}
            </>
          )}

          {/* ── Detail ── */}
          {page === "detail" && (
            <>
              <button className="back-link" onClick={back}>
                <ArrowLeft size={17} /> Kembali
              </button>
              <div className="detail-layout">
                <div>
                  <Cover game={selected} large />
                  <div className="detail-stats">
                    <span><Star size={15} fill="#F7B84B" /> {selected.rating} Rating</span>
                    <span><Gamepad2 size={15} /> {selected.players} pemain</span>
                    <span>{selected.genre}</span>
                  </div>
                </div>
                <div className="detail-copy">
                  <span className="eyebrow">GAME DETAILS</span>
                  <h1>{selected.name}</h1>
                  <p>{selected.description}</p>
                  <div className="detail-actions">
                    <button className="primary" onClick={() => setPage("server")}>
                      <Play size={17} fill="currentColor" /> Main Sekarang
                    </button>
                    <button className="secondary" onClick={() => setPage("topup")}>
                      <Wallet size={17} /> Top Up
                    </button>
                    <button
                      className={selectedInWishlist ? "icon-button saved" : "icon-button"}
                      onClick={() => toggleWishlist(selected.id)}
                      aria-label="Wishlist"
                    >
                      <Heart size={19} fill={selectedInWishlist ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="notice-card">
                    <Zap size={18} />
                    <div>
                      <b>Instant Play</b>
                      <p>Pilih server, lanjutkan, lalu mulai sesi game tanpa download manual.</p>
                    </div>
                  </div>
                </div>
              </div>
              <section className="section">
                <div className="section-head">
                  <h2>Screenshot</h2>
                  <span className="muted tiny">Preview game</span>
                </div>
                <div className="screenshot-strip">
                  <div className="shot shot-one" />
                  <div className="shot shot-two" />
                  <div className="shot shot-three" />
                </div>
              </section>
            </>
          )}

          {/* ── Server selection ── */}
          {page === "server" && (
            <>
              <button className="back-link" onClick={() => setPage("detail")}>
                <ArrowLeft size={17} /> Kembali
              </button>
              <PageHeading
                eyebrow="READY TO PLAY"
                title="Pilih Server"
                subtitle={`Pilih server untuk ${selected.name}. Kamu bisa lanjut setelah memilih satu server.`}
              />
              <div className="server-panel">
                {servers.map((s, i) => (
                  <button
                    key={s}
                    className={server === s ? "server-option selected" : "server-option"}
                    onClick={() => setServer(s)}
                  >
                    <span className="server-avatar">🌏</span>
                    <span>
                      <b>{s}</b>
                      <small>{serverLabels[i]}</small>
                    </span>
                    <span className="radio">{server === s && <i />}</span>
                  </button>
                ))}
                <div className="server-tip">
                  <Zap size={18} />
                  <span>
                    Pilih server dengan koneksi paling stabil untuk pengalaman bermain yang lebih nyaman.
                  </span>
                </div>
                <button className="primary full" disabled={!server} onClick={launch}>
                  Lanjutkan <ChevronRight size={17} />
                </button>
              </div>
            </>
          )}

          {/* ── Library ── */}
          {page === "library" && (
            <>
              <PageHeading
                eyebrow="YOUR COLLECTION"
                title="Library"
                subtitle="Semua game yang kamu simpan ada di sini."
              />
              <div className="tabs">
                <button className={tab === "mine" ? "tab active" : "tab"} onClick={() => setTab("mine")}>
                  Game Saya <span>{mine.length}</span>
                </button>
                <button className={tab === "wishlist" ? "tab active" : "tab"} onClick={() => setTab("wishlist")}>
                  Wishlist <span>{wishlist.length}</span>
                </button>
              </div>
              {tab === "mine" ? (
                <div className="library-list">
                  {games.filter((g) => mine.includes(g.id)).map((g) => (
                    <LibraryRow
                      key={g.id}
                      game={g}
                      action="Mainkan"
                      onClick={() => openGame(g)}
                      onRemove={() => {
                        setMine((old) => old.filter((x) => x !== g.id));
                        fetch("/api/library", {
                          method: "DELETE",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ gameId: g.id }),
                        });
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="library-list">
                  {games.filter((g) => wishlist.includes(g.id)).map((g) => (
                    <LibraryRow
                      key={g.id}
                      game={g}
                      action="Detail"
                      onClick={() => openGame(g)}
                      onRemove={() => toggleWishlist(g.id)}
                    />
                  ))}
                </div>
              )}
              {(tab === "mine" ? mine : wishlist).length === 0 && (
                <Empty
                  title="Belum ada game"
                  text={tab === "mine" ? "Tambahkan game ke koleksimu." : "Simpan game favorit ke Wishlist."}
                />
              )}
            </>
          )}

          {/* ── Profile ── */}
          {page === "profile" && (
            <>
              <PageHeading
                eyebrow="YOUR SPACE"
                title="Profile"
                subtitle="Kelola akun dan preferensi NexPlay."
              />
              <div className="profile-card">
                <div className="avatar">P</div>
                <div>
                  <h2>Player One</h2>
                  <p>player@nexplay.app</p>
                  <span className="member-tag">NexPlay Member</span>
                </div>
                <button className="secondary small" onClick={() => nav("account")}>Edit profil</button>
              </div>
              <div className="settings-list">
                {settingsItems.map((item) => (
                  <button key={item.label} className="setting-row" onClick={() => nav(item.target)}>
                    <item.icon size={19} />
                    <span>{item.label}</span>
                    <ChevronRight size={17} />
                  </button>
                ))}
                <button className="setting-row danger-text" onClick={() => setShowLogout(true)}>
                  <LogOut size={19} />
                  <span>Keluar Akun</span>
                  <ChevronRight size={17} />
                </button>
              </div>
            </>
          )}

          {/* ── Top Up ── */}
          {page === "topup" && (
            <>
              <button className="back-link" onClick={() => setPage("detail")}>
                <ArrowLeft size={17} /> Kembali ke detail
              </button>
              <PageHeading
                eyebrow="GAME TOP UP"
                title="Top Up"
                subtitle={`Pilih nominal untuk ${selected.name}. Ini hanya simulasi UI.`}
              />
              <div className="topup-panel">
                <label className="field-label">ID akun / Player ID</label>
                <input
                  className="form-input"
                  placeholder="Masukkan ID akun game"
                  value={accountId}
                  onChange={(e) => setAccountId(e.target.value)}
                />
                <label className="field-label">Pilih nominal</label>
                <div className="amount-grid">
                  {topupOptions.map((a) => (
                    <button
                      key={a}
                      className={topupAmount === a ? "amount selected" : "amount"}
                      onClick={() => setTopupAmount(a)}
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <div className="notice-card">
                  <ShieldCheck size={18} />
                  <div>
                    <b>Periksa data sebelum lanjut</b>
                    <p>Pastikan ID akun benar. Pembayaran belum terhubung pada prototype ini.</p>
                  </div>
                </div>
                <button
                  className="primary full"
                  onClick={() =>
                    toast(
                      accountId.trim()
                        ? "Pesanan demo disiapkan. Pembayaran belum aktif."
                        : "Masukkan ID akun terlebih dahulu."
                    )
                  }
                >
                  Lanjutkan <ChevronRight size={17} />
                </button>
              </div>
            </>
          )}

          {/* ── Notifications ── */}
          {page === "notifications" && (
            <>
              <SubPage title="Notifikasi" onBack={() => nav("profile")} />
              <Empty title="Belum ada notifikasi" text="Notifikasi terbaru akan muncul di sini." />
            </>
          )}

          {/* ── Account settings ── */}
          {page === "account" && (
            <>
              <SubPage title="Pengaturan Akun" onBack={() => nav("profile")} />
              <div className="form-panel">
                <label className="field-label">Nama pengguna</label>
                <input className="form-input" defaultValue="Player One" />
                <label className="field-label">Email</label>
                <input className="form-input" defaultValue="player@nexplay.app" />
                <button className="primary full" onClick={() => toast("Perubahan profil disimpan (demo).")}>
                  Simpan Perubahan
                </button>
              </div>
            </>
          )}

          {/* ── Language ── */}
          {page === "language" && (
            <>
              <SubPage title="Bahasa" onBack={() => nav("profile")} />
              <div className="settings-list">
                {languages.map((l) => (
                  <button className="setting-row" key={l} onClick={() => setLanguage(l)}>
                    <Globe2 size={18} />
                    <span>{l}</span>
                    {language === l && <Check size={18} className="success-icon" />}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── About ── */}
          {page === "about" && (
            <>
              <SubPage title="Tentang NexPlay" onBack={() => nav("profile")} />
              <div className="about-card">
                <div className="brand-icon big"><Gamepad2 size={28} /></div>
                <h2>NexPlay</h2>
                <p>Discover games. Start playing.</p>
                <span className="muted tiny">Version 1.0.0 • Prototype</span>
              </div>
            </>
          )}

          {/* ── FAQ ── */}
          {page === "faq" && (
            <>
              <SubPage title="Bantuan & FAQ" onBack={() => nav("profile")} />
              <div className="faq-list">
                {faqEntries.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <p>{a}</p>
                  </details>
                ))}
              </div>
            </>
          )}

          {/* ── Login ── */}
          {page === "login" && (
            <>
              <PageHeading
                eyebrow="WELCOME BACK"
                title="Masuk ke NexPlay"
                subtitle="Login demo untuk melanjutkan."
              />
              <div className="form-panel">
                <label className="field-label">Email</label>
                <input className="form-input" placeholder="Email kamu" />
                <label className="field-label">Password</label>
                <input className="form-input" type="password" placeholder="Password" />
                <button className="primary full" onClick={() => nav("home")}>Masuk</button>
              </div>
            </>
          )}
        </div>

        {isMain && (
          <nav className="mobile-nav">
            <button className={page === "home" ? "active" : ""} onClick={() => nav("home")}>
              <Home /><small>Home</small>
            </button>
            <button className={page === "explore" ? "active" : ""} onClick={() => nav("explore")}>
              <Compass /><small>Explore</small>
            </button>
            <button className={page === "library" ? "active" : ""} onClick={() => nav("library")}>
              <LibraryBig /><small>Library</small>
            </button>
            <button className={page === "profile" ? "active" : ""} onClick={() => nav("profile")}>
              <UserRound /><small>Profile</small>
            </button>
          </nav>
        )}
      </section>

      {notice && (
        <div className="toast">
          <Check size={16} /> {notice}
        </div>
      )}

      {showLogout && (
        <div className="modal-backdrop">
          <div className="modal">
            <div className="modal-icon"><LogOut /></div>
            <h2>Keluar dari akun?</h2>
            <p>Kamu perlu masuk lagi untuk mengakses koleksi dan profil.</p>
            <div className="modal-actions">
              <button className="secondary" onClick={() => setShowLogout(false)}>Batal</button>
              <button
                className="primary"
                onClick={() => { setShowLogout(false); nav("login"); }}
              >
                Ya, Keluar
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
