<template>
  <v-main>
    <v-container class="login-card d-flex flex-column">
      <v-container class="d-flex justify-center">
        <v-card width="374" class="px-6 py-10">
          <p class="text-h6 text-center">メールアドレスをお忘れの方</p>
          <p class="text-caption py-6">
            ご登録いただいているメールアドレスをお忘れの方は、お手数ですが下記の窓口までご連絡いただきますよう、お願い申し上げます。
          </p>
          <v-card class="px-4 pb-4">
            <p class="text-center text-h6 pt-5">お問い合わせ窓口</p>
            <p class="text-caption mb-0">メールアドレス</p>
            <a class="text-caption" style="color:#BB9B2D;" href="mailto:premium@ichijo-miyagi.co.jp"
              >premium@ichijo-miyagi.co.jp</a
            >
            <p class="text-caption pt-4 mb-0">電話番号</p>
            <a class="text-caption" style="color:#BB9B2D;" href="tel:022-211-1611">022-211-1611</a>
            <p class="text-caption pt-4">
              受付時間 : 午前9時～午後5時半 <br />
              （但し、日・月・祝日を除きます）
            </p>
          </v-card>
        </v-card>
      </v-container>
    </v-container>
  </v-main>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.login-card {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
