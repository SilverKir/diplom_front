

export interface IHotelRoomProps {
    id : string;
   description : string;
        images: (string|null)[];
        hotel: {
            id : string;
            title: string;        }
}