declare interface Credentials {
  email: string;
  password: string;
}

declare interface SidebarLink {
  imgURL: string;
  route: string;
  label: string;
}

// interfaces.ts
declare interface BookingRequest {
  conversationId: string;
  ai_answer: string;
  user_email: string;
  booking_type: string;
  user_visitDate: string;
  formattedDate: string;
  with_accessories: boolean;
  adult_ticket: number;
  museum_id: string;
  museum_name: string;
  validationMessage: string;
  results: {
    status: number;
    data: Museum[];
    museumFound: boolean;
  };
  museumOpen: boolean;
  user_name: string;
}

declare interface Museum {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  description: string;
  adultCost: number;
  childCost: number;
  seniorCost: number;
  accessoryCost: number;
}

declare interface BookingResponse {
  success: boolean;
  error?: string;
  orderId?: string;
}

// interfaces.ts
declare interface RazorpayError {
  code: string;
  description: string;
  source: string;
  step: string;
  reason: string;
  metadata: Record<string, any>;
}

declare interface RazorpayOrder {
  id: string;
  entity: string;
  amount: number;
  amount_paid: number;
  amount_due: number;
  currency: string;
  receipt: string | null;
  offer_id: string | null;
  offers: string[];
  status: string;
  attempts: number;
  notes: any[];
  created_at: number;
}

declare interface RazorpayPaymentEntity {
  event: string;
  payload: {
    payment: {
      entity: {
        id: string;
        order_id: string;
      };
    };
  };
}

declare interface TicketProps {
  id: string;
  barcodeNo: string;
  bookingId: string;
  status: string;
  visitDate: Date;
}
