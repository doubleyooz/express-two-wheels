import mongoose, { Document, Schema, SchemaTypeOptions } from 'mongoose';

export interface IGig extends Document {
    title: string;
    description: string;
    budget: number;
    type: string;
    userId: string;
    preferredTechnologies: string[];
    active?: boolean;
}

export interface LooseIGig {
    title?: string;
    description?: string;
    budget?: number;
    type?: string;
    userId?: string;
    preferredTechnologies?: string[];
    active?: boolean;
}

const GigSchema: Schema = new Schema<IGig>(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        type: { type: String, required: true },
        budget: { type: Number, required: true, min: 0 },
        preferredTechnologies: { type: [String] },
        userId: { type: String, required: true },
        active: { type: Boolean, default: true },
    },
    { timestamps: true },
);

GigSchema.index({ title: 1, userId: 1 }, { unique: true });

export default mongoose.model<IGig>('Gig', GigSchema);
