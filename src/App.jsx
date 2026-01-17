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
    // Initial session check
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user && !data.user.is_anonymous) {
        setUser(data.user)
        setScreen("app")
      } else {
        setUser(null)
        setScreen("landing")
      }
      setLoading(false)
    })

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user && !session.user.is_anonymous) {
          setUser(session.user)
          setScreen("app")
        } else {
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

  // 1️⃣ Landing Page
  if (screen === "landing") {
    return <Landing onStart={() => setScreen("auth")} />
  }

  // 2️⃣ Login / Signup Page (CENTERED)
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

  // 3️⃣ Main App
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
