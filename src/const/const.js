const constants = {
  userType: {
    premium: 1, // user type of プレミアム
    normal: 2, // user type of 一般
    nonMember: 3, // user type of 非会員
  },
  userStatus: {
    enrolledPremium: 1, // user status of 入会中
    waitingPayment: 2, // user status of 入金待ち
    expiredMembership: 3, // user status of 入金待ち
    receptionCompleted: 4, // user status of 受付完了
    beforeSending: 5, // user status of 決済情報送信前
    withdrawalProcedure: 6, // user status of 要退会手続
    withdrew: 7, // user status of 退会済
    unenrolled: 8, // user status of 未入会
  },
  paymentMethod: {
    creditCard: 1, // payment method of クレジット払い
    convenienceStore: 2, // payment method of コンビニ払い
    unregistered: 3, // payment method of 未登録
  },
  email: {
    notSend: 0,
    isSend: 1,
  },
  pointType: {
    contimous: 1,
    campaign: 2,
    renovation: 3,
    afterConstruction: 4,
    other: 5
  }
};

export default constants;
