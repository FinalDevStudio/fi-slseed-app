<i18n>
en:
  TITLE: Dashboard
  NOTIFICATIONS:
    TITLE: Notifications
    LINK: View notifications list
  USERS:
    TITLE: Users
    LINK: View users list
</i18n>

<template lang="pug">
section.ui.vertical.segment.view
  .ui.equal.width.grid.container
    .column
      .ui.red.segment
        h4.ui.red.header
          | {{ $t('TITLE') }}

        p(v-text="currentTime")

    .row
      .column
        .ui.top.attached.blue.segment
          .ui.center.aligned.blue.icon.header
            i.circular.exclamation.circle.icon
            | {{ $t('NOTIFICATIONS.TITLE') }}

        router-link.ui.bottom.attached.labeled.icon.blue.button(to="/notifications")
          i.list.icon
          | {{ $t('NOTIFICATIONS.LINK') }}

      .column
        .ui.top.attached.yellow.segment
          .ui.center.aligned.yellow.icon.header
            i.circular.users.icon
            | {{ $t('USERS.TITLE') }}

        router-link.ui.bottom.attached.labeled.icon.yellow.button(to="/users")
          i.list.icon
          | {{ $t('USERS.LINK') }}
</template>

<script>
export default {
  created() {
    this.interval = setInterval(this.$forceUpdate, 1000);
  },

  data() {
    return {
      interval: null
    };
  },

  computed: {
    currentTime() {
      return this.$moment().format('LLLL');
    }
  },

  destroy() {
    clearInterval(this.interval);
  }
};
</script>
