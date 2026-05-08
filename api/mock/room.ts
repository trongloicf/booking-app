import { Room } from "@/type/interfaces/room";

export const ROOM_MOCK: Room[] = [
  {
    roomId: 101,
    facilityId: 1,
    roomName: "Phòng Deluxe Giường Đôi",
    price: 1200000,
    roomThumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max500/440553263.jpg?k=90fa8b1fbad477e4a00a3d2eaa3fd7fe3caf2c39f5ae08622848ba7e109b2b3f&o=",
    amenities: [1, 12, 13, 14],
    roomDescription:
      "Phòng Deluxe Giường Đôi với đầy đủ tiện nghi và không gian rộng rãi.",
    maxAdults: 2,
    maxChildren: 1,
  },
  {
    roomId: 102,
    facilityId: 2,
    roomName: "Phòng Suite Hướng Biển",
    price: 2500000,
    roomThumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/211116688.jpg?k=c66ee50feffa4eda16513faccbc1c36cc95bb533ce92248848d3ae11a9904dc9&o=",
    amenities: [1, 12, 13],
    roomDescription:
      "Phòng Suite Hướng Biển với tầm nhìn biển tuyệt đẹp và tiện nghi cao cấp.",
    maxAdults: 2,
    maxChildren: 0,
  },
  {
    roomId: 103,
    facilityId: 1,
    roomName: "Phòng Deluxe Giường Đôi",
    price: 1200000,
    roomThumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295887870.jpg?k=9837f627bdc8783a5cec129d2af30888806500872e6ac1435c23412c736d07b1&o=",
    roomDescription:
      "Phòng Deluxe Giường Đôi với đầy đủ tiện nghi và không gian rộng rãi.",
    amenities: [1, 12, 13, 14],
    maxAdults: 2,
    maxChildren: 1,
  },
  {
    roomId: 104,
    facilityId: 1,
    roomName: "Phòng Suite Hướng Biển",
    price: 2500000,
    roomThumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/295891634.jpg?k=ac4c02fe6797e2a0f5b189d0f9256b16b503e4b426e5f2b1ea6c65d0c82f157c&o=",
    roomDescription:
      "Phòng Suite Hướng Biển với tầm nhìn biển tuyệt đẹp và tiện nghi cao cấp.",
    amenities: [12, 13, 14],
    maxAdults: 2,
    maxChildren: 0,
  },
];
