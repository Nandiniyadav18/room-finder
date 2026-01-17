import { useEffect, useState } from "react"
import { supabase } from "./supabase"

import Landing from "./components/Landing"
import Auth from "./components/Auth"
import AddRoom from "./components/AddRoom"
import RoomList from "./components/RoomList"

export default function App() {
  const [user, setUser] = useState(null)
  const [screen, setScreen] = useState("landing")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null)
      setLoading(false)
    })

    const { data: listener } =
      supabase.auth.onAuthStateChange((_e, session) => {
        setUser(session?.user || null)
      })

    return () => listener.subscription.unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>

  if (screen === "landing") {
    return <Landing onStart={() => setScreen("auth")} />
  }

  if (!user) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Auth />
      </div>
    )
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🏠 Room Finder</h1>

      <p>Logged in as {user.email}</p>

      <button onClick={() => supabase.auth.signOut()}>
        Logout
      </button>

      <AddRoom user={user} />
      <RoomList user={user} />
    </div>
  )
}


