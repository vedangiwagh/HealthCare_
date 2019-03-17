import { User } from './user';
import { Doctor } from './doctor';

export class Booking {
    _id: string;
    user: string;
    doctor: string;
    date: string;
    time: number;
    date_time: string;
    userid: string;
    docid: string;
    status: boolean;
}

export interface BookingDoc {
    userid: string;
    docid: string;
}