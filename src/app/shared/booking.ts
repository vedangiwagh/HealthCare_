import { User } from './user';
import { Doctor } from './doctor';

export class Booking {
    _id: string;
    user: User;
    doctors: Doctor[];
    createdAt: string;
    updatedAt: string;
    date: string;
    time: string;
}

export interface BookingDoc {
    user: string;
    doctor: string;
}