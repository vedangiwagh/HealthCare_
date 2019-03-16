import { Medpress } from '../shared/medpres';
export class Prescription
{
    _id: string;
    doctor : string;
    location: string;
    description: string;
    medicines: Medpress[];
    quantity: number;
    date: string;
}