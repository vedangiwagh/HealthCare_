import { Comment } from './comment';

export class Doctor {
    _id: string;
    name: string;
    image: string;
    location: string;
    specialization: string;
    description: string;
    comments: Comment[];
}