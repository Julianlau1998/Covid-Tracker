<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(159, 159, 159);
}
body {
  background-color: #0e141a;
}

.header {
  font-size: 3.5rem;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
@media (min-width: 800px) {
  body {
    margin: 0 12rem 0 12rem;
  }
}
</style>
