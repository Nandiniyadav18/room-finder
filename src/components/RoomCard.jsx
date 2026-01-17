import { useState } from "react"
import { supabase } from "../supabase"

export default function RoomCard({ room, user }) {
  const [edit, setEdit] = useState(false)
  const [price, setPrice] = useState(room.price)

  const updateRoom = async () => {
    await supabase
      .from("room")
      .update({ price })
      .eq("id", room.id)

    alert("Room updated")
    setEdit(false)
    window.location.reload()
  }

  const deleteRoom = async () => {
    if (!window.confirm("Delete this room?")) return
    await supabase.from("rooms").delete().eq("id", room.id)
    window.location.reload()
  }

  return (
    <div className="card">
      <img
  src={room.image_url}
  alt="room"
  style={{ width: "100%", height: "220px", objectFit: "cover" }}
/>



      <h3>{room.title}</h3>
      <p>📍 {room.location}</p>

      {edit ? (
        <input value={price} onChange={(e) => setPrice(e.target.value)} />
      ) : (
        <p>💰 ₹{room.price}</p>
      )}

      <p>🏠 {room.property_type}</p>
      <p>👤 {room.tenant_type}</p>
      <p>📞 {room.contact}</p>

      {user && user.id === room.owner_id && (
        <>
          {edit ? (
            <button onClick={updateRoom}>Save</button>
          ) : (
            <button onClick={() => setEdit(true)}>Edit</button>
          )}
          <button onClick={deleteRoom} style={{ background: "red" }}>
            Delete
          </button>
        </>
      )}
    </div>
  )
}
