import Hero from "./components/hero";
import Pokemon_list from "./components/pokemon_list";
import Search from "./components/search";

export default function Home() {
  return (
    <>
      <Hero/>
      <Search/>
      <Pokemon_list/>
    </>
  );
}
