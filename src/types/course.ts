export interface Course {
  id: number;
  title: string;
  description: string | null;
  content: string | null;
  imageUrl: string | null;
  instructorId: number;
  createdAt: Date;
  updatedAt: Date;
}
