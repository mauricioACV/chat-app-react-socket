const rooms = ['arcade', 'webdesign', 'coding'];

export const addRoom = ({ id, room }) => {
  room = room.trim().toLowerCase();
  const existingRoom = rooms.find((room) => room.room === room);
  if (existingRoom) return { error: "La sala ya existe" };
  rooms.push({ id, room });
  console.log(rooms);
  return { rooms };
};

export const removeRoom = (id) => {
  const index = rooms.findIndex((room) => room.id === id);
  if (index !== -1) return rooms.splice(index, 1)[0];
};

export const getRooms = () => rooms;