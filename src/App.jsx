import { useEffect, useState } from "react"
import { supabase } from "./supabase"

import Landing from "./components/Landing"
import Auth from "./components/Auth"
import AddRoom from "./components/AddRoom"
import RoomList from "./components/RoomList"

export default function App() {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState("landing") // landing | auth | app
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 🔒 INITIAL CHECK — KILL ANONYMOUS SESSION
    const initAuth = async () => {
      const { data } = await supabase.auth.getUser()

      // ❌ If anonymous user → force logout
      if (data?.user?.is_anonymous) {
        await supabase.auth.signOut()
        setUser(null)
        setScreen("landing")
      }
      // ✅ Real logged-in user
      else if (data?.user) {
        setUser(data.user)
        setScreen("app")
      }
      // ❌ No user
      else {
        setUser(null)
        setScreen("landing")
      }

      setLoading(false)
    }

    initAuth()

    // 🔄 LISTEN FOR AUTH CHANGES
    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        // ❌ Anonymous detected → logout immediately
        if (session?.user?.is_anonymous) {
          await supabase.auth.signOut()
          setUser(null)
          setScreen("auth")
        }
        // ✅ Email/password user
        else if (session?.user) {
          setUser(session.user)
          setScreen("app")
        }
        // ❌ Logged out
        else {
          setUser(null)
          setScreen("auth")
        }
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) {
    return <p style={{ padding: 40 }}>Loading...</p>
  }

  // 1️⃣ LANDING PAGE (ANIMATION)
  if (screen === "landing") {
    return <Landing onStart={() => setScreen("auth")} />
  }

  // 2️⃣ LOGIN / SIGNUP PAGE (CENTERED)
  if (screen === "auth") {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f8fafc",
        }}
      >
        <div style={{ width: 360 }}>
          <h1 style={{ textAlign: "center", marginBottom: 20 }}>
            🏠 Room Finder
          </h1>
          <Auth />
        </div>
      </div>
    )
  }

  // 3️⃣ MAIN APP (ONLY REAL USERS)
  return (
    <div style={{ padding: 40 }}>
      <h1>🏠 Room Finder</h1>

      <p>✅ Logged in as {user.email}</p>

      <button onClick={() => setScreen("landing")}>
        Back to Home
      </button>

      <button
        style={{ marginLeft: 10 }}
        onClick={() => supabase.auth.signOut()}
      >
        Logout
      </button>

      <hr style={{ margin: "20px 0" }} />

      <AddRoom user={user} />
      <RoomList user={user} />
    </div>
  )
}

