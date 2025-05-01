import { getCardExpireDate } from "../utils/cardDate";

export const testPaymentCardData = {
    cardNumber: '1111-1111-1111-1111',
    expirationDate: getCardExpireDate(),
    cvv: '1234',
    holderName: 'Jimmy Neutron'
}