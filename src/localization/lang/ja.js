/*
 * In vue file, you can refer from like $t('general.auth.email')
 *     - Defined in node_modules/vue-i18n/types/index.d.ts > VueI18n class
 */
const ja = {
  localeLabel: '日本語',
  general: {
    attendee: '出席者',
    customer: '顧客',
    title: 'タイトル',
    image_location: '位置画像',
    address: '住所',
    postcode: '郵便番号',
    phone_number: '電話番号',
    auth: {
      welcome: 'ようこそ',
      signInMessage: 'アカウントにサインイン',
      email: 'メールアドレス',
      password: 'パスワード',
      showPassword: 'パスワード表示',
      rememberMe: 'ログイン状態を保持する',
      login: 'ログイン',
      adminLogin: 'Adminログイン',
      logout: 'ログアウト',
      register: '登録',
      // ---------------------------------------------------
      // PASSWORD FORGOT
      // ---------------------------------------------------
      forgetEmail: 'メールアドレスを忘れた方はこちら',
      forgetPassword: 'パスワードを忘れた方はこちら',
      forForgotPassword: 'パスワードをお忘れの方',
      submitForgotPassword: 'ご登録いただいているメールアドレスを入力し「送信する」をクリックしてください。',
      sendingForgotPassword: '送信する',
      // ---------------------------------------------------
      // TRANSMISION COMPLETE
      // ---------------------------------------------------
      transmisionComplete: 'メール送信完了',
      confirmTransmision: 'ご指定いただいたメールアドレスへメールを送信いたしましたのでご確認ください。',
      // ---------------------------------------------------
      // PASSWORD RESET
      // ---------------------------------------------------
      resetPassword: 'パスワード再設定',
      pleasePassword: '新しいパスワードを入力してください',
      details: 'メールアドレス',
      newPassword: '新しいパスワード',
      newConfirmPassword: '新しいパスワード(確認)',
      setPassword: '新しいパスワードを設定する',
      passwordsDontMatch: 'パスワードが一致しませんでした。',
    },
    // ---------------------------------------------------
    // WITHDRAWAL
    // ---------------------------------------------------
    withdrawal: {
      aplication: '退会申請',
      cancel: 'プレミアム会員を退会します。\n 本当によろしいですか？',
      title: 'キャンセル',
      detail: '退会',
      complete: '退会完了',
      procedure: '退会の手続きが完了しました。\n ご愛好いただきありがとうございました。',
    },
    // ---------------------------------------------------
    // MY PAGE
    // ---------------------------------------------------
    mypage: {
      mypage: 'マイページ',
      news: 'お知らせ',
      date: '日付',
      title: 'タイトル',
      seeNewsList: 'お知らせ一覧を見る',
      ownedPoints: '保有ポイント',
      pointProcesed: '操作ポイント',
      seePoints: 'ポイント履歴をみる',
      renewalDueDate: '更新期限',
      registeredInformation: 'ご登録情報',
      membershipType: '会員種別',
      name: 'お名前',
      telephoneNumber: 'お電話番号',
      address: 'ご住所',
      edit: '編集する',
      frequentlyAsked: 'よくあるご質問',
      clickHere: '会員規約・利用約款はこちら',
      cancel: '退会を希望する方はこちら',
    },
    // ---------------------------------------------------
    // USER
    // ---------------------------------------------------
    user: {
      editREgisteredInformation: 'ご登録情報の編集',
      update: '更新する',
    },
    // ---------------------------------------------------
    // POINT
    // ---------------------------------------------------
    point: {
      pointsMutationHistory: 'ポイント履歴',
      updateDetails: '更新分として',
      details: '内容',
    },
    // ---------------------------------------------------
    // News
    // ---------------------------------------------------
    news: {
      newsList: 'お知らせ一覧',
      date: '日付',
      title: 'タイトル',
      newsDetail: 'お知らせ詳細',
    },
    pointHistory: {
      date: '日付',
      details: '内容',
    },
    role: {
      role: '役割',
      admin: '管理者',
      user: 'ユーザー',
    },
    validation: {
      required: '必須',
      optional: '任意',
      confirm: '確認',
      phoneRegex: '電話番号の形式が正しくありません',
      length: '文字数が上限を超えています',
      email: 'メールアドレスの形式が正しくありません',
      passwordTooShort: 'パスワードは8文字以上で入力してください。',
      passwordTooLong: 'パスワードは32文字以下で入力してください。',
      emailCheck: 'パスワードが正しくありません',
      passwordCheck: 'メールアドレスが正しくありません',
    },
    demo: {
      dummyMeetings: '打ち合わせ',
    },
    crud: {
      createNew: '新規作成',
      list: '一覧',
      add: '新規作成',
      edit: '編集',
      update: '更新',
      change: '変更',
      delete: '削除',
      search: '検索',
      all: '全部',
      createdAt: '作成日',
      updatedAt: '更新日',
      action: '編集',
      submit: '登録',
    },
    time: {
      date: '日付',
      time: '時間',
    },
    nav: {
      projectName: 'CLUB ICHIJO',
      grune: 'Grune',
      dashboard: 'ダッシュボード',
      users: 'ユーザー',
      mypage: 'マイページ',
      userEdit: 'ご登録情報の編集',
      point: 'ポイント履歴',
      news: 'お知らせ一覧',
      newsDetail: 'お知らせ詳細',
      logout: 'ログアウト',
    },
    placeholder: {
      email: 'sample@email.com',
      firstName: '山下',
      lastName: '太郎',
      fullName: '山下太郎',
    },
    alert: {
      youSure: '削除確認',
      confirmDelete: '選択したデータを削除します。削除されたデータは元に戻せません。',
    },
    action: {
      backToList: '一覧に戻る',
    },
  },
};

export default ja;
