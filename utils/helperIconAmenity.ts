// export const getAmenityConfig = (name: string) => {
//   const normalizedName = name.toLowerCase();

//   if (normalizedName.includes("wifi"))
//     return { icon: "wifi", color: "#2b4785" };
//   if (normalizedName.includes("hồ bơi"))
//     return { icon: "pool", color: "#03a9f4" };
//   if (normalizedName.includes("gym"))
//     return { icon: "dumbbell", color: "#f44336" };
//   if (normalizedName.includes("spa")) return { icon: "spa", color: "#e91e63" };
//   if (normalizedName.includes("bar"))
//     return { icon: "glass-cocktail", color: "#673ab7" };
//   if (normalizedName.includes("bữa sáng"))
//     return { icon: "coffee", color: "#ff9800" };
//   if (normalizedName.includes("dịch vụ phòng"))
//     return { icon: "room-service-outline", color: "#795548" };
//   if (normalizedName.includes("bãi đỗ xe"))
//     return { icon: "parking", color: "#607d8b" };
//   if (normalizedName.includes("điều hòa"))
//     return { icon: "air-conditioner", color: "#4fa3f7" };
//   if (normalizedName.includes("tivi"))
//     return { icon: "television", color: "#444" };
//   if (normalizedName.includes("máy pha cà phê"))
//     return { icon: "kettle-outline", color: "#8d6e63" };
//   if (normalizedName.includes("bàn làm việc"))
//     return { icon: "desk", color: "#5d4037" };
//   if (normalizedName.includes("ban công"))
//     return { icon: "balcony", color: "#4caf50" };
//   if (normalizedName.includes("thang máy"))
//     return { icon: "elevator", color: "#9e9e9e" };
//   if (normalizedName.includes("lễ tân"))
//     return { icon: "bell-ring-outline", color: "#009688" };
//   if (normalizedName.includes("giặt ủi"))
//     return { icon: "washing-machine", color: "#00bcd4" };

//   return { icon: "check-circle-outline", color: "#ccc" }; // Mặc định
// };

export const getAmenityConfig = (name: string) => {
  const normalizedName = name.toLowerCase();

  if (normalizedName.includes("wifi")) return { icon: "wifi" };
  if (normalizedName.includes("hồ bơi")) return { icon: "pool" };
  if (normalizedName.includes("gym")) return { icon: "dumbbell" };
  if (normalizedName.includes("spa")) return { icon: "spa" };
  if (normalizedName.includes("bar")) return { icon: "glass-cocktail" };
  if (normalizedName.includes("bữa sáng")) return { icon: "coffee" };
  if (normalizedName.includes("dịch vụ phòng"))
    return { icon: "room-service-outline" };
  if (normalizedName.includes("bãi đỗ xe")) return { icon: "parking" };
  if (normalizedName.includes("điều hòa")) return { icon: "air-conditioner" };
  if (normalizedName.includes("tivi")) return { icon: "television" };
  if (normalizedName.includes("máy pha cà phê"))
    return { icon: "kettle-outline" };
  if (normalizedName.includes("bàn làm việc")) return { icon: "desk" };
  if (normalizedName.includes("ban công")) return { icon: "balcony" };
  if (normalizedName.includes("thang máy")) return { icon: "elevator" };
  if (normalizedName.includes("lễ tân")) return { icon: "bell-ring-outline" };
  if (normalizedName.includes("giặt ủi")) return { icon: "washing-machine" };

  return { icon: "check-circle-outline" };
};
