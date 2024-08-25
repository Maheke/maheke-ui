<script lang="ts">
  import Home from "./routes/home/Home.svelte";
  import { Route, Router } from "svelte-navigator";
</script>

<Router primary={false}>
  <main>
    <Header />
    <Route path="/" component={Home} />
    <Footer />
  </main>
</Router>
