export type RootStackParamList = {
  OpenScreen: undefined;
  Validation: { phoneNumber: string };
  Login:undefined;
  MainTabs: undefined;
  Home: undefined;
  SignUp:undefined;
  Forgot:undefined;
  bookings:undefined;
  chat:undefined;
  account:undefined;
  GeneralService:undefined;
  HomeService:undefined;
  services: { serviceName: string };
  Profile: undefined;
  Orders: undefined;
  InviteEarn: undefined;
  RateApp: undefined;
  CustomerSupport: undefined;
  Feedback: undefined;
  AboutUs: undefined;
  Settings: undefined;
  NotFound:any;
  // Add more routes as needed
};

export type BottomTabParamList = {
  Home: undefined;
  bookings: undefined;
  chat: undefined;
  account: undefined;
};