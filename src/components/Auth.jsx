import { useState } from "react"
import { supabase } from "../supabase"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const signUp = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })
    setLoading(false)

    if (error) {
      alert(error.message)
    } else {
      alert("Signup successful! You can now login.")
    }
  }

  const login = async () => {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    setLoading(false)

    if (error) {
      alert(error.message)
    }
  }

  return (
    <div style={{ maxWidth: 350, marginTop: 40 }}>
      <h2>Login / Signup</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: 8, marginBottom: 10 }}
      />

      <button onClick={login} disabled={loading} style={{ width: "100%" }}>
        Login
      </button>

      <button
        onClick={signUp}
        disabled={loading}
        style={{ width: "100%", marginTop: 10 }}
      >
        Signup
      </button>
    </div>
  )
}








