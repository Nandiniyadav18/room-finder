import { useEffect, useState } from "react"
import { supabase } from "../supabase"
import RoomCard from "./RoomCard"

export default function RoomList({ user }) {
  const [rooms, setRooms] = useState([])

  const [location, setLocation] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [property, setProperty] = useState("")
  const [tenant, setTenant] = useState("")

  useEffect(() => {
    fetchRooms()
  }, [])

  const fetchRooms = async () => {
    let query = supabase.from("room").select("*")

    if (location.trim()) {
      query = query.ilike("location", `%${location.trim()}%`)
    }

    if (maxPrice) {
      query = query.lte("price", Number(maxPrice))
    }

    if (property) {
      query = query.ilike("property_type", `%${property}%`)
    }

    if (tenant) {
      query = query.ilike("tenant_type", `%${tenant}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error(error)
    } else {
      setRooms(data || [])
    }
  }

  return (
    <div>
      <h2>🔍 Search Rooms</h2>

      <input
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Rent"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      <select value={property} onChange={(e) => setProperty(e.target.value)}>
        <option value="">Property Type</option>
        <option value="1 BHK">1 BHK</option>
        <option value="2 BHK">2 BHK</option>
        <option value="3 BHK">3 BHK</option>
      </select>

      <select value={tenant} onChange={(e) => setTenant(e.target.value)}>
        <option value="">Tenant Preference</option>
        <option value="Bachelor">Bachelor</option>
        <option value="Family">Family</option>
        <option value="Girls">Girls</option>
        <option value="Working">Working</option>
      </select>

      <button onClick={fetchRooms}>Apply Filters</button>

      <h2>🏘 Available Rooms</h2>

      {rooms.length === 0 && <p>No rooms found</p>}

      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} user={user} />
      ))}
    </div>
  )
}

