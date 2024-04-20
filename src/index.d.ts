interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    image: string;
    order_id: string;
    prefill: {
      name: string;
      email: string;
      contact: string;
    };
    notes: {
      address: string;
    };
    theme?: {
      color: string;
    };
  }
  
  interface RazorpayInstance {
    open(): void;
    // Add other methods or properties as needed
  }
  
  interface RazorpayConstructor {
    new (options: RazorpayOptions): RazorpayInstance;
  }
  
  declare global {
    interface Window {
      Razorpay: RazorpayConstructor;
    }
  }