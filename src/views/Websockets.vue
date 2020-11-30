<template>
  <div class="websockets-page-container">
    <div class="controls-row">
      <div class="button" @click="listenToTransactions" :class="{disabled: !canListen}">
        Запуск
      </div>
      <div class="button" @click="stopListeningToTransactions" :class="{disabled: !canStop}">
        Остановка
      </div>
      <div class="button" @click="clearTransactions" :class="{disabled: !sum}">
        Сброс
      </div>
    </div>
    <div class="controls-row">
      <div class="sum-thing">SUM: {{ sum }}</div>
    </div>
    <div>
      <table class="transactions-table">
        <tr class="table-header">
          <td v-for="field in shownFields" :key="field.key">
            {{ field.name }}
          </td>
        </tr>
        <tr v-for="(transaction, index) in transactionsFormatted" :key="index">
          <td v-for="field in shownFields" :key="field.key">{{ transaction[field.key] }} {{ field.postfix }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
const statuses = [
  {
    id: 'disabled',
    name: 'Отключено',
  },
  {
    id: 'stopped',
    name: 'Остановлено',
  },
  {
    id: 'listening',
    name: 'Слушаем',
  },
].reduce((ret, status) => {
  ret[status.id] = status;
  return ret;
}, {});

export default {
  name: 'Websockets',
  data() {
    return {
      transactions: [],
      status: statuses.disabled,
      websocket: null,
    };
  },
  mounted() {
    this.websocket = new WebSocket(`wss://ws.blockchain.info/inv`);
    this.websocket.onopen = this.handleWebsocketOpen;
    this.websocket.onclose = this.handleWebsocketClose;
    this.websocket.onmessage = this.handleWebsocketMessage;
    this.websocket.onerror = this.handleWebsocketError;
  },
  beforeUnmount() {
    this.websocket.close();
  },
  computed: {
    canListen() {
      return this.status.id === 'stopped';
    },
    canStop() {
      return this.status.id === 'listening';
    },
    shownFields() {
      return [
        {
          key: 'from',
          name: 'FROM',
        },
        {
          key: 'to',
          name: 'TO',
        },
        {
          key: 'value',
          name: 'SUM',
          postfix: ' BTC',
        },
      ];
    },
    transactionsFormatted() {
      return this.transactions.map(transaction => {
        return {
          from: transaction.inputs.map(item => item.prev_out.addr).join(',\n'),
          to: transaction.out.map(item => item.addr).join(',\n'),
          value:
            transaction.out.reduce((sum, item) => {
              return sum + item.value;
            }, 0) / 100000000,
        };
      });
    },
    sum() {
      return this.transactionsFormatted.reduce((sum, item) => {
        return sum + item.value;
      }, 0);
    },
  },
  methods: {
    listenToTransactions() {
      if (this.sendWebsocketMessage({op: 'unconfirmed_sub'})) {
        this.status = statuses.listening;
      }
    },
    stopListeningToTransactions() {
      if (this.sendWebsocketMessage({op: 'unconfirmed_unsub'})) {
        this.status = statuses.stopped;
      }
    },
    clearTransactions() {
      this.transactions = [];
    },
    handleWebsocketOpen() {
      this.status = statuses.stopped;
      console.log('websocket connected');
      this.sendWebsocketMessage({op: 'ping'});
    },
    handleWebsocketClose() {
      this.status = statuses.disabled;
    },
    handleWebsocketMessage(message) {
      const data = JSON.parse(message.data);
      if (data && data.op === 'utx') {
        this.transactions.push(data.x);
      }
    },
    handleWebsocketError(error) {
      console.warn(error);
    },
    sendWebsocketMessage(message) {
      if (this.status.id !== 'unavailable' && this.websocket.readyState === 1) {
        this.websocket.send(JSON.stringify(message));
        return true;
      }

      console.warn(`Attempt to send a message in an unavailable state`, message);
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
$border-color: #ddd;

.controls-row {
  display: flex;
  align-items: center;
  height: 48px;
  & .button,
  & .sum-thing {
    margin: 0 4px;
  }
}

.sum-thing {
  min-width: 32px;
}

.transactions-table {
  font-size: 11px;
  & > .table-header {
    font-weight: bolder;
  }
  & > tr {
    & > td {
      padding: 4px 8px;
      border-bottom: 1px solid $border-color;
    }
    & > td:nth-child(1),
    & > td:nth-child(2) {
      width: 300px;
      text-decoration: underline;
    }
    & > td:nth-child(3) {
      width: 100px;
    }
  }
}
</style>

<style scoped lang="scss" src="@/styles/buttons.scss"></style>
