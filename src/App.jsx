import { useEffect, useState } from "react"
import { supabase } from "./supabase"

import Landing from "./components/Landing"
import Auth from "./components/Auth"
import AddRoom from "./components/AddRoom"
import RoomList from "./components/RoomList"

export default function App() {
  const [user, setUser] = useState(null)
  const [hasStarted, setHasStarted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ONLY restore user, do NOTHING else
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user ?? null)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) {
    return <p style={{ padding: 40 }}>Loading...</p>
  }

  // 1️⃣ Landing page
  if (!hasStarted) {
    return <Landing onStart={() => setHasStarted(true)} />
  }

  // 2️⃣ Login page
  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#f8fafc",
        }}
      >
        <h1 style={{ marginBottom: 20 }}>🏠 Room Finder</h1>
        <Auth />
      </div>
    )
  }

  // 3️⃣ Main App
  return (
    <div style={{ padding: 40 }}>
      <h1>🏠 Room Finder</h1>

      <p>✅ Logged in as {user.email}</p>

      <button onClick={() => setHasStarted(false)}>
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



