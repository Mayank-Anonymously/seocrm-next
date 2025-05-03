// LIVE;
// export const baseURL = "http://18.204.165.219:9291/api/v1";
// export const imagebaseURL = "http://18.204.165.219:9291/resources/";

// // // LIVE;
// export const baseURL = "https://api.mylavya.com/api/v1";
export const imagebaseURL = "https://api.mylavya.com/resources/";
export const baseURL = "https://real-back-tau.vercel.app";

// LOCAL;
// export const baseURL = "http://192.168.1.15:9291/api/v1";
// export const imagebaseURL = "http://192.168.1.15:9291/resources/";

// export const baseURL = "http://192.168.1.13:9291/api/v1";
// export const imagebaseURL = "http://192.168.1.13:9291/resources/";

// export const baseURL = "http://192.168.1.20:9291/api/v1";
// export const imagebaseURL = "http://192.168.1.20:9291/resources/";

// export const baseURL = "http://192.168.1.7:9291/api/v1";
// export const imagebaseURL = "http://192.168.1.7:9291/resources/";

// export const baseURL = "http://172.20.10.5:9291/api/v1";
// export const imagebaseURL = "http://172.20.10.5:9291/resources/";

// export const baseURL = "http://10.0.0.51:9291/api/v1";
// export const imagebaseURL = "http://10.0.0.51:9291/resources/";

//REGISTER
export const POST_FAKE_REGISTER = "/post-fake-register";


//TESTIMONIAL
export const GET_ALL_TESTIMONIAL = "/testimonial/get-all-testimonial-for-admin";
export const ADD_NEW_TESTIMONIAL = "/testimonial/create-testimonial";
export const UPDATE_TESTIMOINAL_STATUS= "/testimonial/update-testimonial-status/";
export const EDIT_TESTIMONIAL = "/testimonial/edit-testimonial/" ;
export const DELETE_TESTIMONIAL = "/testimonial/delete-testimonial/"

//VACATIONS
export const DELETE_VACATION_BY_ID = "/vacation/delete-vacation-by-id/"
export const GET_All_VACATIONS = "/vacation/get-all-vacations"

//LOGIN
export const POST_FAKE_LOGIN = "/post-fake-login";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/fake-forget-pwd";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/post-fake-profile";

//CALENDER
export const GET_EVENTS = "/events";
export const GET_CATEGORIES = "/categories";
export const GET_UPCOMMINGEVENT = "/upcommingevents";
export const ADD_NEW_EVENT = "/add/event";
export const UPDATE_EVENT = "/update/event";
export const DELETE_EVENT = "/delete/event";

//CONTACT FROM 
export const GET_ALL_CONTACT_FORM = "/contact-form/get-all-contact"


//SUBSCRIBE EMAIL 
export const GET_ALL_SUBSCRIBE_MAILS = "/user-subscribe/get-all-subscribe-user";

//RATING
export const GET_ALL_RATING = "/rating/get-all-rating-for-admin";
export const DELETE_REVIEW = "/rating/delete-rating/";

// API Key
export const GET_API_KEY = "/api-key";
export const ADD_NEW_API_KEY = "/add/api-key";
export const UPDATE_API_KEY = "/update/api-key";
export const DELETE_API_KEY = "/delete/api-key";

// Contacts
export const GET_CONTACTS = "/get-contacts";
export const ADD_NEW_CONTACT = "/add/contacts";
export const UPDATE_CONTACT = "/update/contacts";
export const DELETE_CONTACT = "/delete/contacts";

// Team
export const GET_TEAM = "/get-team";
export const ADD_NEW_MEMBER = "/add/member";
export const UPDATE_MEMBER = "/update/member";
export const DELETE_MEMBER = "/delete/member";

// Dashboard charts data
export const GET_ALL_DATA = "/all-data";
export const GET_MONTHLY_DATA = "/monthly-data";
export const GET_HALFYEARLY_DATA = "/halfyearly-data";
export const GET_YEARLY_DATA = "/yearly-data";


/*  Category  */
export const POST_NEW_CATEGORY = "/category/create-category";
export const POST_NEW_SUB_CATEGORY = "/category/create-sub-category";
export const GET_ALL_CATEGORY = "/category/get-all-categories";
export const GET_ALL_SUB_CATEGORY_BY_CATID =
  "/category/get-sub-category-by-cat-id";
export const GET_ALL_SUB_CATEGORY = "/category/get-all-sub-category";
export const GET_SUBCATEGORY_BY_ID = "/category/get-subcategory-by-id/";
export const UPDATE_SUBCATEGORY_BY_ID = "/category/update-subcategory-by-id/";
export const DELETE_SUBCATEGORY_BY_ID = "/category/delete-subcategory-by-id/";
/*  Category  */

/* product */
export const POST_NEW_PRODUCT = "/product/create-product";
export const GET_ALL_PRODUCT = "/product/get-all-products-for-admin";
export const UPDATE_STOCK = "/stock/update-qty";
export const EDIT_PRODUCT = "/product/update-product-details";
export const EDIT_PRODUCT_STATUS = "/product/update-product-status";
/* product */

/* ORDER */
export const GET_ALL_ORDERS = "/order/get-all-orders";
export const UPDATE_ORDER = "/order/update-order-by-id";
export const ASSIGN_ORDER = "/order/assign-to-partner";
export const DEFINE_ROUTE = "/order/define-route/"
/* ORDER */

/* ORDER */
export const GET_ALL_SUBSCRIPTION = "/order/get-order-by-status";
/* ORDER */

/* ORDER */
export const GET_ALL_LOCATIONS = "/location/get-all-serving-locations";
export const ADD_NEW_LOCATION = "/location/add-new-location";
/* ORDER */

/* HUB */
export const GET_ALL_HUB = "/hub/get-all-hubs";
export const ADD_NEW_HUB = "/hub/create-new-hub";
/* HUB */

/* PARTNER */
export const GET_ALL_PARTNER = "/partner/get-all-partners";
export const ADD_NEW_PARTNER = "/partner/add-new-partner";
export const UPDATE_PARTNER_GIVEN_AMOUNT_BY_ID = "/partner/update-partner-given-amount-by-id/"
/* PARTNER */

/* CITY */
export const GET_ALL_CITY = "/city/get-all-city";
export const ADD_NEW_CITY = "/city/add-new-city";
/* CITY */

/* CONTENT */
export const GET_ALL_CONTENT = "/content/get-all-content";
export const ADD_NEW_CONTENT = "/content/add-new-content";
/* CONTENT */

export const DETAILS_OF_GATEWAY = "/order/get-payment-details-by-id";

export const CREATE_OFFER = "/offer/create-new-offer";
export const GET_ALL_OFFER = "/offer/fetch-all-offer";

export const UPLOAD_BANNER = "/banner/upload-banner-image";
export const GET_ALL_BANNERS = "/banner/get-all-banners-for-admin";
export const DELETE_BANNER = "/banner/delete-banner-by-id/"
export const UPDATE_BANNER = "/banner/update-banner-by-id/"
export const UPDATE_BANNER_STATUS = "/banner/update-banner-status/";

//SILDERS
export const GET_ALL_SLIDER = "/slider/get-all-sliders-for-admin";
export const UPLOAD_SLIDER = "/slider/upload-slider-image";
export const DELETE_SLIDER = "/slider/delete-slider-by-id/"
export const UPDATE_SLIDER = "/slider/update-slider-by-id/"
export const UPDATE_SLIDER_STATUS = "/slider/update-slider-status/";

//OFFER HEADING
export const CREATE_OFFER_HEADING = '/offer-heading/create-offer-heading';
export const GET_ALL_OFFER_HEADING = '/offer-heading/get-all-offer-heading';
export const EDIT_OFFER_HEADING = '/offer-heading/edit-offer-heading/'
export const DELETE_OFFER_HEADING = '/offer-heading/delete-offer-heading/'

export const CREATE_MEMBERSHIP = "/vip/membership/subscribe-new-membership";

export const CREATE_NEW_MEMBERSHIP = "/vip/membership/create-new-membership";
export const GET_ALL_MEMBERSHIP = "/vip/membership/get-membership";
export const EDIT_MEMBERSHIP = "/vip/membership/edit-membership";

export const EDIT_CATEGORY = "/category/edit-category-by-id";

//recharge
export const CREATE_NEW_OFFER = "/recharge/create-recharge-offer";
export const GET_RECHARGE_OFFER = "/recharge/get-all-offer";
export const EDIT_RECHARGE_OFFER = "/recharge/update-offer";

//first time recharge
export const CREATE_FIRST_TIME_RECHARGE = "/first-time-recharge/create-first-time-recharge-offer";
export const GET_ALL_FIRST_TIME_RECHARGE = "/first-time-recharge/get-all-first-time-offer";
export const EDIT_FIRST_TIME_RECHARGE = "/first-time-recharge/update-first-time-offer";
export const DELETE_FIRST_TIME_RECHARGE = "/first-time-recharge/delete-by-id"
export const CHANGE_STATUS_BY_ID = "/first-time-recharge/status-changestatusById-by-id"

export const CHECK_WALLET_REQUEST =
  "/recharge-via-cash/fetch-request-for-recharge";

export const DELETELOCATION = "/location/delete-location/";
export const UPDATELOCATION = "/location/update-location/";

//Get User
export const GETUSER = "/login/get-all-app-user";
export const UPDATE_USER_WALLET = "/login/update-user-wallet/";


//Vendor
export const CREATE_NEW_VENDOR = "/vendor/add-vendor";
export const GET_ALL_VENDORS = "/vendor/get-all-vendors"
export const GET_VENDOR = "/vendor/get-vendor-by-id/"
export const UPDATE_VENDOR = "/vendor/update-vendor-by-id/"
export const DELETE_VENDOR = "/vendor/delete-vendor-by-id/"


export const GET_TOTAL_SALE_WITH_VIP = "/accounting/total-sale-with-vip"
export const GET_TOTAL_SALE_WITHOUT_VIP = "/accounting/total-sale-without-vip"
export const GET_ALL_AMOUNT = "/accounting/total-amount-received-by-company"
export const CREATE_PURCHASE = "/accounting/purchase-by-user"
export const GET_ALL_PURCHAES = "/accounting/get-all-purchase-by-user"
export const CREATE_EXPENSES = "/accounting/expenses"
export const GET_ALL_EXPENSES = "/accounting/get-all-expenses"
export const UPDATE_GIVEN_AMOUNT = "/accounting/update-given-amount-by-id/"


export const GET_ALL_USER = "/auth/get-all-user/CRM";

export const POST_LOGIN = "/auth/login/CRM";


export const GET_ALL_QUERY = "/contact/get-all-queries/CRM";
