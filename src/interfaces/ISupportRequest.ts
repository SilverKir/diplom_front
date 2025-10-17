export interface ISupportRequest {
  id: string;
  createdAt: string;
  isActive: boolean;
  hasNewMessages: boolean;
  client?: {
    id: string;
    name: string;
    email: string;
    contactPhone: string;
  };
}
