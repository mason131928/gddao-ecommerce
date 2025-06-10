import crypto from "crypto-js";

export interface PaymentData {
  MerchantID: string;
  RespondType: string;
  TimeStamp: string;
  Version: string;
  MerchantOrderNo: string;
  Amt: number;
  ItemDesc: string;
  Email?: string;
  LoginType?: number;
  CREDIT?: number;
  VACC?: number;
  ReturnURL?: string;
  NotifyURL?: string;
  ClientBackURL?: string;
  OrderComment?: string;
}

export interface TradeInfo {
  MerchantID: string;
  TradeInfo: string;
  TradeSha: string;
  Version: string;
}

export interface PaymentResult {
  MerchantID: string;
  Amt: number;
  TradeNo: string;
  MerchantOrderNo: string;
  PaymentType: string;
  RespondType: string;
  PayTime: string;
  IP: string;
  EscrowBank: string;
  PayBankCode?: string;
  PayerAccount5Code?: string;
  CodeNo?: string;
}

export interface DecryptedTradeInfo {
  Status: string;
  MerchantID: string;
  Version: string;
  TradeNo?: string;
  MerchantOrderNo?: string;
  Amt?: number;
  ItemDesc?: string;
  PaymentType?: string;
  RespondType?: string;
  PayTime?: string;
  IP?: string;
  EscrowBank?: string;
  PayBankCode?: string;
  PayerAccount5Code?: string;
  CodeNo?: string;
  Message?: string;
  Result?: PaymentResult;
  [key: string]: string | number | PaymentResult | undefined;
}

/**
 * 產生藍新金流交易資訊
 */
export function generateTradeInfo(paymentData: PaymentData): TradeInfo {
  const hashKey = process.env.NEWEBPAY_HASH_KEY || "";
  const hashIV = process.env.NEWEBPAY_HASH_IV || "";

  // AES 加密
  const aesEncrypt = crypto.AES.encrypt(
    JSON.stringify(paymentData),
    crypto.enc.Utf8.parse(hashKey),
    {
      iv: crypto.enc.Utf8.parse(hashIV),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    }
  ).toString();

  // SHA256 雜湊
  const tradeSha = crypto
    .SHA256(`HashKey=${hashKey}&${aesEncrypt}&HashIV=${hashIV}`)
    .toString()
    .toUpperCase();

  return {
    MerchantID: paymentData.MerchantID,
    TradeInfo: aesEncrypt,
    TradeSha: tradeSha,
    Version: paymentData.Version,
  };
}

/**
 * 解密藍新金流的交易資訊
 */
export function decryptTradeInfo(tradeInfo: string): DecryptedTradeInfo {
  const hashKey = process.env.NEWEBPAY_HASH_KEY || "";
  const hashIV = process.env.NEWEBPAY_HASH_IV || "";

  // AES 解密
  const decrypt = crypto.AES.decrypt(
    tradeInfo,
    crypto.enc.Utf8.parse(hashKey),
    {
      iv: crypto.enc.Utf8.parse(hashIV),
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7,
    }
  );

  return JSON.parse(decrypt.toString(crypto.enc.Utf8)) as DecryptedTradeInfo;
}
