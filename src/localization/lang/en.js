/*
 * [Vuei18n feature] In vue file, you can refer from like $t('general.auth.email')
 *     - Defined in node_modules/vue-i18n/types/index.d.ts > VueI18n class
 */
const en = {
  localeLabel: 'English',
  general: {
    attendee: 'Attendee',
    customer: 'Customer',
    title: 'Title',
    image_location: 'Image Location',
    address: 'Address',
    postcode: 'Postcode',
    phone_number: 'Phone Number',
    auth: {
      welcome: 'Welcome',
      signInMessage: 'Sign in to your account',
      email: 'Email',
      password: 'Password',
      showPassword: 'Show Password',
      rememberMe: 'Remember Me',
      login: 'Login',
      adminLogin: 'Admin Login',
      logout: 'Logout',
      register: 'Register',
      // ---------------------------------------------------
      // PASSWORD FORGET
      // ---------------------------------------------------
      forgetEmail: 'Forget Email',
      forgetPassword: 'Forget Password',
      forForgotPassword: 'For Forgot password ',
      submitForgotPassword: 'Please enter your registered email address and click "Submit".',
      sendingForgotPassword: 'Sending',
      // ---------------------------------------------------
      // TRANSMISION COMPLETE
      // ---------------------------------------------------
      transmisionComplete: 'Mail transmission complete',
      confirmTransmision: 'Please confirm that the email has been sent to the email address you specified.',
      // ---------------------------------------------------
      // PASSWORD RESET
      // ---------------------------------------------------
      resetPassword: 'Reset password',
      pleasePassword: 'Please enter a new password.',
      details: 'Detail',
      newPassword: 'New Password',
      newConfirmPassword: 'New Password (Confirm)',
      setPassword: 'Set a new password.',
      passwordsDontMatch: 'The passwords do not match',
    },
    // ---------------------------------------------------
    // WITHDRAWAL
    // ---------------------------------------------------
    withdrawal: {
      aplication: 'Application for withdrawal',
      cancel: 'Cancel your premium membership. \n Are you sure you want to do this?',
      title: 'Title',
      detail: 'Details',
      complete: 'Withdrawal completed',
      procedure: 'The withdrawal procedure has been completed. \n Thank you for your loyalty.',
    },
    // ---------------------------------------------------
    // MY PAGE
    // ---------------------------------------------------
    mypage: {
      mypage: 'My Page',
      news: 'News',
      date: 'Date',
      title: 'Title',
      seeNewsList: 'See News List',
      ownedPoints: 'Owned Points',
      pointProcesed: 'Point Processed',
      seePoints: 'See Points Mutation History',
      renewalDueDate: 'Renewal Due Date',
      registeredInformation: 'Registered Information',
      membershipType: 'Membership Type',
      name: 'Name',
      telephoneNumber: 'Telephone Numbere',
      address: 'Address',
      edit: 'Edit',
      frequentlyAsked: 'Frequently Asked Questions',
      clickHere: 'Click here for Membership Agreement and Terms of Use',
      cancel: 'Cancel Membership',
    },
    // ---------------------------------------------------
    // USER
    // ---------------------------------------------------
    user: {
      editREgisteredInformation: 'Edit Registered Information',
      update: 'Update',
    },
    // ---------------------------------------------------
    // POINT
    // ---------------------------------------------------
    point: {
      pointsMutationHistory: 'Points Mutation History',
      updateDetails: 'Update Details',
      details: 'Details',
    },
    // ---------------------------------------------------
    // News
    // ---------------------------------------------------
    news: {
      newsList: 'News List',
      date: 'Date',
      title: 'Title',
      newsDetail: 'News Details',
    },
    pointHistory: {
      date: 'Date',
      details: 'Datails',
    },
    role: {
      role: 'Role',
      admin: 'Administrator',
      user: 'User',
    },
    validation: {
      required: 'Required',
      optional: 'Optional',
      confirm: 'Confirm',
      phoneRegex: 'Please use correct phone number format',
      length: 'Maximum number of character is 255',
      emailInvalid: 'This email is invalid',
      passwordTooShort: 'Password minimum 8 characters.',
      passwordTooLong: 'Password maximum 32 characters.',
    },
    demo: {
      dummyMeetings: 'Dummy Meetings',
    },
    crud: {
      createNew: 'Create New',
      list: 'List',
      add: 'Add New',
      edit: 'Edit',
      update: 'Update',
      change: 'Change',
      delete: 'Delete',
      search: 'Search',
      all: 'All',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      action: 'Action',
      submit: 'Submit',
    },
    time: {
      date: 'Date',
      time: 'Time',
    },
    nav: {
      projectName: 'CLUB ICHIJO',
      grune: 'Grune',
      dashboard: 'Dashboard',
      users: 'Users',
      mypage: 'My Page',
      userEdit: 'Edit Registered Information',
      point: 'Points Mutation History',
      news: 'News List',
      newsDetail: 'News Details',
      logout: 'logout',
    },
    placeholder: {
      email: 'sample@email.com',
      firstName: 'Abdul',
      lastName: 'Ali',
      fullName: 'Abdul Ali',
    },
    alert: {
      youSure: 'Are you sure?',
      confirmDelete: 'Once the item is deleted, we cannot get it back for you.',
    },
    action: {
      backToList: 'Back To List',
    },
  },
};

export default en;
