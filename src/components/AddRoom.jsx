import { supabase } from "../supabase"

export default function AddRoom({ user }) {

  const addRoom = async (e) => {
    e.preventDefault()
    const form = e.target
    const file = form.image.files[0]

    if (!file) {
      alert("Please select an image")
      return
    }

    const fileName = `${user.id}-${Date.now()}-${file.name}`

    // Upload image to storage
    const { error: uploadError } = await supabase.storage
      .from("room-images")
      .upload(fileName, file)

    if (uploadError) {
      alert(uploadError.message)
      return
    }

    // Get public image URL
    const { data: urlData } = supabase.storage
      .from("room-images")
      .getPublicUrl(fileName)

    // Insert room into DB
    const { error } = await supabase.from("room").insert({
      title: form.title.value,
      location: form.location.value.trim(),
      price: Number(form.price.value),
      property_type: form.property.value,
      tenant_type: form.tenant.value,
      contact: form.contact.value,
      owner_id: user.id,
      image_url: urlData.publicUrl
    })

    if (error) {
      alert("Insert failed: " + error.message)
      return
    }

    alert("Room added successfully")
    form.reset()
  }

  return (
    <form onSubmit={addRoom} className="card">
      <h2>Add Room</h2>

      <input name="title" placeholder="Title" required />
      <input name="location" placeholder="Location" required />
      <input name="price" type="number" placeholder="Rent" required />

      <select name="property" required>
        <option value="1 BHK">1 BHK</option>
        <option value="2 BHK">2 BHK</option>
        <option value="3 BHK">3 BHK</option>
      </select>

      <select name="tenant" required>
        <option value="Bachelor">Bachelor</option>
        <option value="Family">Family</option>
        <option value="Girls">Girls</option>
        <option value="Working">Working</option>
      </select>

      <input name="contact" placeholder="Contact Number" required />

      {/* ✅ SINGLE IMAGE INPUT */}
      <input name="image" type="file" required />

      <button type="submit">Add Room</button>
    </form>
  )
}
