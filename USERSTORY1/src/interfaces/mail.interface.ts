export interface MailParams {
    to: string | string[];
    subject: string;
    text?: string;
    html?: string;
    from?: string;
};