import { useEffect, useState } from "react"
import { supabase } from "./supabase"
import Auth from "./components/Auth"
import AddRoom from "./components/AddRoom"
import RoomList from "./components/RoomList"
import Landing from "./components/Landing"

export default function App() {
  const [user, setUser] = useState(null)
  const [showApp, setShowApp] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const logout = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  // 🔹 Show landing page first
  if (!showApp) {
    return <Landing onStart={() => setShowApp(true)} />
  }

  return (
    <div className="container">
      <h1>🏠 Room Finder</h1>

      {!user && <Auth />}

      {user && (
        <>
          <p>✅ Logged in as {user.email}</p>
          <button onClick={logout}>Logout</button>
          <AddRoom user={user} />
        </>
      )}

      <RoomList user={user} />
    </div>
  )
}
