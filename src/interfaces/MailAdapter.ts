export type SendEmail =
    (email: ({ to: String, body: string, cc?: string, cco?: string })) => Promise<Boolean>;
