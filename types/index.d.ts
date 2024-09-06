declare interface Credentials {
  email: string;
  password: string;
}

declare interface SidebarLink {
  route: string;
  label: string;
}

// interfaces.ts
declare interface BookingRequest {
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
