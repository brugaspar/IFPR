<template>
  <div>
    <div class="row mt-4 mb-4">
      <div v-if="objInfo" class="card">
        <h2 class="card-header">Filme details</h2>
        <button
          @click="closeDetails"
          style="width: 110px"
          type="button"
          class="btn btn-secondary btn-block"
        >
          close
        </button>
        <form>
          <div class="single category">
            <label class="col-sm-2 col-form-label">Poster</label>
            <div class="col-sm-10">
              <span class="form-control">
                <img width="100" :src="objInfo.movieTMDB['poster_path']" />
              </span>
            </div>

            <label class="col-sm-2 col-form-label">Historia</label>
            <div class="col-sm-10">
              <p>{{ objInfo.movieTMDB.overview }}</p>
            </div>

            <div
              class="form-group row"
              v-for="(value, key) in objInfo"
              :key="key"
            >
              <label
                v-if="key !== 'movieTMDB'"
                class="col-sm-2 col-form-label"
                >{{ key }}</label
              >
              <div v-if="key !== 'movieTMDB'" class="col-sm-10">
                <div class="form-control mb-2 mt-2" v-if="Array.isArray(value)">
                  <p v-for="item in value" :key="item.id">
                    {{ item.name }}
                  </p>
                </div>
                <span v-else class="form-control mb-2 mt-2">{{ value }}</span>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div class="col-md-12 text-center">
        <table
          class="table table-striped table-bordered table-hover"
          data-toggle="table"
        >
          <thead>
            <tr>
              <th data-sortable="true" data-field="id">ID</th>
              <th data-sortable="true" data-field="name">Nome</th>
              <th data-sortable="true" data-field="categories">Categoria</th>
              <th data-sortable="true" data-field="type">Tipo</th>
              <th @click="orderByNota" class="run" data-sortable="true">
                Nota &#8650;
              </th>
              <th data-sortable="true">#</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in filmes" :key="item.id">
              <td>{{ item.id }}</td>
              <td
                style="color: blue; cursor: pointer"
                @click="getObjInfo(item.id)"
                title="details"
              >
                {{ item.name }}
              </td>

              <td>
                <p v-for="category in item.categories" :key="category.id">
                  {{ category.name }}
                </p>
              </td>
              <td>{{ item.type }}</td>
              <td>{{ item.score }}</td>
              <td>
                <button @click="remove(item.id)">&#x2715;</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Filmes",
  components: {},
  data() {
    return {
      index: 0,
      filmes: [],
      renderTable: true,
      objInfo: null,
    };
  },
  methods: {
    closeDetails: function () {
      this.renderTable = true;
      this.objInfo = null;
    },
    remove(objId) {
      const delete_url = `http://localhost:8080/api/movie/${objId}`;
      axios.delete(delete_url).then((res) => {
        this.getLista();
      });
    },
    getLista() {
      const path = "http://localhost:8080/api/movies";
      axios.get(path).then((res) => {
        this.filmes = res.data;
      });
    },
    orderByNota() {
      const path = "http://localhost:8080/api/movies?order=nota";
      axios.get(path).then((res) => {
        this.filmes = res.data;
      });
    },
    getObjInfo: function (id) {
      const api_filme_url = `http://localhost:8080/api/movie/${id}`;
      this.renderTable = false;
      axios.get(api_filme_url).then((response) => {
        this.objInfo = response.data;
      });
    },
  },
  created: function () {
    this.getLista();
  },
};
</script>

<style scoped>
.card {
  border: none;
}
.single {
  padding: 30px 15px;

  background: #fcfcfc;
  border: 1px solid #f0f0f0;
}
.single h3.side-title {
  margin: 0;
  margin-bottom: 10px;
  padding: 0;
  font-size: 20px;
  color: #333;
  text-transform: uppercase;
}
.single h3.side-title:after {
  content: "";
  width: 60px;
  height: 1px;
  background: #ff173c;
  display: block;
  margin-top: 6px;
}

.single ul {
  margin-bottom: 0;
}
.single li a {
  color: #666;
  font-size: 14px;
  text-transform: uppercase;
  border-bottom: 1px solid #f0f0f0;
  line-height: 40px;
  display: block;
  text-decoration: none;
}
.single li a:hover {
  color: #ff173c;
}
.single li:last-child a {
  border-bottom: 0;
}
</style>