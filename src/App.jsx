import { useEffect, useState } from "react"
import { supabase } from "./supabase"

import Landing from "./components/Landing"
import Auth from "./components/Auth"
import AddRoom from "./components/AddRoom"
import RoomList from "./components/RoomList"

export default function App() {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState("landing") // ALWAYS start here
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // only get user, DO NOT change screen
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) {
        setUser(data.user)
      }
      setLoading(false)
    })

    // auth listener ONLY affects user, not landing
    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null)
      })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) {
    return <p style={{ padding: 40 }}>Loading...</p>
  }

  // 1️⃣ Landing page (ALWAYS FIRST)
  if (screen === "landing") {
    return <Landing onStart={() => setScreen("auth")} />
  }

  // 2️⃣ Login page
  if (!user && screen === "auth") {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8fafc",
      }}
    >
      <h1 style={{ marginBottom: 20 }}>🏠 Room Finder</h1>
      <Auth />
    </div>
  )
}


  // 3️⃣ Main App
  if (user) {
    return (
      <div style={{ padding: 40 }}>
        <h1>🏠 Room Finder</h1>

        <p>✅ Logged in as {user.email}</p>

        <button onClick={() => setScreen("landing")}>
          Back to Home
        </button>

        <button onClick={() => supabase.auth.signOut()}>
          Logout
        </button>

        <AddRoom user={user} />
        <RoomList user={user} />
      </div>
    )
  }

  return null
}

