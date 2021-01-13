<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper blue darken-1">
        <a href="#" class="brand-logo center">FALE MAIS BRASIL</a>
      </div>
    </nav>

    <div class="container">
      <ul>
        <li v-for="(erro, index) of errors" :key="index">
          campo <b>{{ erro.field }}</b> - {{ erro.defaultMessage }}
        </li>
      </ul>

      <form @submit.prevent="save">
        <label>Origem</label>
        <input type="text" placeholder="Origem" v-model="product.origin" />
        <label>Destino</label>
        <input type="text" placeholder="Destino" v-model="product.destiny" />
        <label>Plano</label>
        <input type="text" placeholder="Plano" v-model="product.talkMore" />
        <label>Minutos da Ligação</label>
        <input
          type="text"
          placeholder="Minutos da Ligação"
          v-model="product.perHour"
        />
        <button class="waves-effect waves-light btn-small">
          Salvar<i class="material-icons left">save</i>
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ORIGEM</th>
            <th>DESTINO</th>
            <th>PAGAMENTO COM PLANO</th>
            <th>PAGAMENTO SEM PLANO</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="product of products" :key="product.id">
            <td>{{ product.origin }}</td>
            <td>{{ product.destiny }}</td>
            <td>{{ product.paymentplan }}</td>
            <td>{{ product.paymentwithoutplan }}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import Product from './services/products';

export default {
  name: 'app',
  data() {
    return {
      product: {
        origin: '',
        destiny: '',
        talkMore: '',
        perHour: '',
      },
      products: [],
      errors: [],
    };
  },

  mounted() {
    this.list();
  },

  methods: {
    list() {
      Product.list()
        .then(response => {
          this.products = response.data;
        })
        .catch(e => {
          console.log(e);
        });
    },

    save() {
      if (!this.product.id) {
        Product.save(this.product)
          .then(response => {
            this.product = {};
            alert('Cadastrado com sucesso!');
            this.list();
            this.errors = {};
          })
          .catch(e => {
            alert('Erro. Tente novamente.');
          });
      }
    },
  },
};
</script>

<style>
</style>
