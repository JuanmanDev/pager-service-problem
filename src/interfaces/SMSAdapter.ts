export type SendSMS = (email: ({ numbers: String[], body: string })) => Promise<void>;
