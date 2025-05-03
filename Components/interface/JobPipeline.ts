// import { Jobs } from "./jobs";

export type JobPipeline = {
  id: string;
  email: string;
  candidateName: string;
  phone: string;
  totalExp: number;
  availability: string;
  createdBy: string;
  preferredCity: string;
  preferredState: string;
  preferredShift: string;
  preferredHours: number;
  desiredPay: number;
  dateCreated: string;
  notes: string;
  // jobsFeeds: Array<Jobs>;
};

// export type Pipeline = {
//   id: string;
//   email: string;
//   candidateName: string;
//   phone: string;
//   totalExp: number;
//   availability: string;
//   createdBy: string;
//   preferredCity: string;
//   preferredState: string;
//   preferredShift: string;
//   preferredHours: number;
//   desiredPay: number;
//   dateCreated: string;
//   notes: string;
// };
